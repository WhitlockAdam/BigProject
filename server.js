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
const client = new MongoClient(url);
client.connect(console.log("connected"));

app.listen(PORT);

var expenseList = [];

app.post('/api/login', async (req, res, next) =>{

    var error = "";
    const { email, password } = req.body;
    const db = client.db("BuccaneerBudgeting");
    const results = await db.collection("Users").find({email: email, password: password}).toArray();
    var id = -1;
    var firstName = '';
    var lastName = '';
    if(0 < results.length){
        id = results[0]._id;
        firstName = results[0].firstName;
        lastName = results[0].lastName;
    }
    
    var ret = { id: id, firstName: firstName, lastName: lastName, error: ""};
    res.status(200).json(ret);

});

app.post('/api/register', async (req, res, next) =>{

    var error = "";
    const { email, password, firstName, lastName } = req.body;
    const db = client.db("BuccaneerBudgeting");
    await db.collection("Users").insertOne({email: email, password: password, firstName: firstName, lastName: lastName});
    const results = await db.collection("Users").find({email: email, password: password}).toArray();
    if(0 < results.length){
        id = results[0]._id;
    }
    var ret = {id: id, firstName: firstName, lastName: lastName, error: ""};
    res.status(200).json(ret);

});

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
    const { userId, query } = req.body;
    var _search = query.trim();
    const db = client.db("BuccaneerBudgeting");
    const results = await db.collection("Expenses").find({"userId":userId, "name":{$regex:_search+".*",$options:"i"}}).toArray();
    //"name":{$regex:_search+".*",$options:"i"}
    var _ret = [];
    for( var i=0; i<results.length; i++ )
    {
        var lowerFromList = results[i].name.toLocaleLowerCase();
        if( lowerFromList.indexOf( _search ) >= 0 )
        {
            _ret.push({name: results[i].name, cost: results[i].cost, date: results[i].date});
        }
    }
    var ret = {results:_ret, error:''};
    res.status(200).json(ret);
});
