const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();
app.set("port", (process.env.PORT||5000));
app.use(bodyParser.json());
app.use(cors());


app.use((req, res, next) =>{

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();

});

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

app.listen(process.env.PORT || 5000, () => {console.log("Server listening on port " + PORT)});

var expenseList = [];

app.post('/api/addexpense', async (req, res, next) =>{

    var error = "";

    const {userId, expense} = req.body;
    const newExpense = {Expense: expense, UserId: userId}

    try{

        const db = client.db("BuccaneerBudgeting");
        const result = db.collection("expenses").insertOne(newExpense);

    }
    catch(e){
        error = e.toString();
    }

    var ret = {error: error};

    res.status(200).json(ret);

    expenseList.push(expense);

    var ret = {error: error};
    res.status(200).json(ret);

});

app.post('/api/login', async (req, res, next) =>{

    var error = "";
    const { email, password } = req.body;
    const db = client.db("BuccaneerBudgeting");
    const results = await db.collection("Users").find({Email: email, Password: password}).toArray();
    var id = -1;
    var firstName = '';
    var lastName = '';
    if(0 < results.length){
        id = results[0].id;
        firstName = results[0].firstName;
        lastName = results[0].lastName; 
        alert("empty")
    }
    var ret = { id:id, firstName:firstName, lastName:lastName, error:"bruh"};
    res.status(200).json(ret);
});

app.post('/api/searchexpense', async (req, res, next) =>{
    var error = "";
    const { userId, query } = req.body;
    var _search = query.trim();
    const db = client.db("BuccaneerBudgeting");
    const results = await db.collection("expenses").find({"Name":{$regex:_search+".*",$options:"i"}}).toArray();
    var _ret = [];
    for( var i=0; i<expenseList.length; i++ )
    {
        var lowerFromList = expenseList[i][0].toLocaleLowerCase();
        if( lowerFromList.indexOf( _search ) >= 0 )
        {
            _ret.push( results[i].Name );
        }
    }
    var ret = {results:_ret, error:''};
    res.status(200).json(ret);
});
