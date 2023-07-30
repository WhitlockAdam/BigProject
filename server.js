const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) =>{

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();

});

app.set("port", (process.env.PORT||5000));

if (process.env.NODE_ENV === 'production')
{
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) =>
    {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

require("dotenv").config();
const url = process.env.MONGODB_URI;
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const client = new MongoClient(url);
client.connect(console.log("connected"));

app.listen(PORT);

const sgMail = require('@sendgrid/mail');
const { verify } = require('crypto');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

app.post('/api/login', async (req, res, next) =>{

    var error = "";
    const { email, password } = req.body;
    const db = client.db("BuccaneerBudgeting");
    const results = await db.collection("Users").find({email: email, password: password}).toArray();
    var id = -1;
    var firstName = '';
    var lastName = '';
    var verified = false;
    var ret = {};
    if(0 < results.length){
        id = results[0]._id;
        firstName = results[0].firstName;
        lastName = results[0].lastName;
        verified = results[0].verified
    }
    if(!verified){
        error = "Your account is unverified."
        ret = {error: error};
    }
    else{
        ret = {_id: id, firstName: firstName, lastName: lastName, email: email, error: ""};   
    }
    res.status(200).json(ret);
});

app.post('/api/register', async (req, res, next) =>{

    var error = "";
    var ret = {};
    const { email, password, firstName, lastName } = req.body;
    const db = client.db("BuccaneerBudgeting");
    const emailCheck = await db.collection("Users").find({email: email}).toArray();
    if(0 < emailCheck.length){
        error = "This email is associated with an existing account.";
        ret = {error: error};
    }
    else{
        var code = generateVerificationCode();
        await db.collection("Users").insertOne({email: email, password: password, firstName: firstName, lastName: lastName, verificationCode: code, verified: false});
        const results = await db.collection("Users").find({email: email}).toArray();
        if(0 < results.length){
            _id = results[0]._id;
        }
        ret = {error: ""};
        sendVerificationEmail(email, firstName, code, "https://budget-manager-group14-bacfc735e9a2.herokuapp.com/activate");
    }
    res.status(200).json(ret);
});

app.post('/api/verify', async (req, res, next)=>{
    var error = "", ret = {};
    const { email, verificationCode } = req.body;
    const db = client.db("BuccaneerBudgeting");
    var results = await db.collection("Users").find({email: email, verificationCode: verificationCode}).toArray();
    if(0 < results.length){
        await db.collection("Users").findOneAndUpdate({email: email, verificationCode: verificationCode},{$set: {verified: true, verificationCode: null}});
    }
    else{
        error = "error";
    }
    ret = {error: error};
    res.status(200).json(ret);
});

app.post('/api/resetpassword', async (req, res, next)=>{
    var error = "", ret = {};
    const{ email, verificationCode, newPassword} = req.body;
    const db = client.db("BuccaneerBudgeting");
    var results = await db.collection("Users").find({email: email}).toArray();
    if(0 < results.length){
        if(results[0].verified === false){
            error = "Account not verified.";
        }
        else if(results[0].verificationCode === null){
            error = "A password reset was not requested for this account.";
        }
        else if(results[0].verificationCode !== verificationCode){
            error = "Incorrect verification code.";
        }
        else{
            await db.collection("Users").findOneAndUpdate({email: email, verificationCode: verificationCode},{$set: {password: newPassword, verificationCode: null}});
        }
    }
    else{
        error = "Account not found.";
    }
    ret = {error: error};
    res.status(200).json(ret);
});

app.post('/api/sendresetpasswordemail', async (req, res, next)=>{
    var error = "", ret = {};
    const{ email } = req.body;
    const db = client.db("BuccaneerBudgeting");
    var results = await db.collection("Users").find({email: email}).toArray();
    if(0 < results.length){
        if(results.verified === false){
            error = "Account not verified.";
        }
        else{
            var code = generateVerificationCode();
            await db.collection("Users").findOneAndUpdate({email: email},{$set: {verificationCode: code}});
            SendPasswordResetEmail(email, code, "https://budget-manager-group14-bacfc735e9a2.herokuapp.com/activate");
        }
    }
    else{
        error = "Account not found.";
    }
    ret = {error: error};
    res.status(200).json(ret);
});

function generateVerificationCode(){
    var code = Math.floor(Math.random()*1e6).toString();
    while(code.length < 6){
        code = `0${code}`;
    }
    return code;
}

function sendVerificationEmail(recipient, name, verificationCode, link){
    const msg = {
        to: recipient, // Change to your recipient
        from: 'buccaneerbudgeting@gmail.com', // Change to your verified sender
        subject: 'Verify Your Account',
        dynamic_template_data: {"name": name, "verificationCode": verificationCode, "link": link},
        template_id: "d-f20d776f08db4cc1a061aa08a55e2bc2"
    }
    sgMail
    .send(msg)
    .then(() => {   
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
}

function SendPasswordResetEmail(recipient, verificationCode, link){
    const msg = {
        to: recipient, // Change to your recipient
        from: 'buccaneerbudgeting@gmail.com', // Change to your verified sender
        subject: 'Reset Your Password',
        dynamic_template_data: {"verificationCode": verificationCode, "link": link},
        template_id: "d-094b22ab526c4aa9b18825d7f5010316"
    }
    sgMail
    .send(msg)
    .then(() => {   
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
}

function SendDeleteAccountEmail(recipient, verificationCode, link){
    const msg = {
        to: recipient, // Change to your recipient
        from: 'buccaneerbudgeting@gmail.com', // Change to your verified sender
        subject: 'Reset Your Password',
        dynamic_template_data: {"verificationCode": verificationCode, "link": link},
        template_id: "d-b2a5ded862584d3b9dfcf3aac7cabdf2"
    }
    sgMail
    .send(msg)
    .then(() => {   
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
}

app.post('/api/addexpense', async (req, res, next) =>{

    var error = "";

    const {userId, name, cost, date} = req.body;
    const newExpense = {userId: userId, name: name, cost: cost, date: date}

    try{

        const db = client.db("BuccaneerBudgeting");
        db.collection("Expenses").insertOne(newExpense);

    }
    catch(e){
        error = e.toString();
    }

    var ret = {error: error};

    res.status(200).json(ret);

});

app.post('/api/searchexpense', async (req, res, next) =>{
    var error = "";
    const { userId, queryName, queryCost, queryDate } = req.body;
    var _searchName = queryName.trim();
    var _searchCost = queryCost.trim();
    var _searchDate = queryDate.trim();
    const db = client.db("BuccaneerBudgeting");
    const results = await db.collection("Expenses").find({"userId":userId, "name":{$regex:_searchName+".*",$options:"i"}, "cost":{$regex:_searchCost+".*"}, "date":{$regex:_searchDate+".*"}}).toArray();
    //"name":{$regex:_search+".*",$options:"i"}
    var _ret = [];
    for( var i=0; i<results.length; i++ )
    {
        _ret.push({name: results[i].name, cost: results[i].cost, date: results[i].date, _id: results[i]._id});
        /*
        var lowerFromList = results[i].name.toLocaleLowerCase();
        if( lowerFromList.indexOf( _search ) >= 0 )
        {
            _ret.push({name: results[i].name, cost: results[i].cost, date: results[i].date, _id: results[i]._id});
        }
        */
    }
    var ret = {results:_ret, error:''};
    res.status(200).json(ret);
});

app.post('/api/deleteexpense', async (req, res, next) =>{
    var error = "";
    const { userId, query } = req.body;
    const db = client.db("BuccaneerBudgeting");
    await db.collection("Expenses").deleteOne({"userId": userId, "_id": new ObjectId(query)});
    var ret = {error:''};
    res.status(200).json(ret);
});