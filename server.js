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
const mongoose = require("mongoose");
mongoose.connect(url).then(()=>console.log("Connected to database.")).catch(e=>console.log(e));


app.listen(PORT);

var api = require('./api.js');
api.setApp(app, mongoose);