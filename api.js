require('express');
require('mongodb');
const ObjectId = require("mongodb").ObjectId;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const User = require('./models/user.js');
const Expense = require('./models/expense.js');

exports.setApp = function(app, client){
    app.post('/api/login', async (req, res, next) =>{

        var error = "";
        const { email, password } = req.body;
        const results = await User.find({email: email, password: password});
        var id = -1;
        var firstName = '';
        var lastName = '';
        var verified = false;
        var ret = {};
        if(0 < results.length){
            id = results[0]._id;
            firstName = results[0].firstName;
            lastName = results[0].lastName;
            verified = results[0].verified;
            if(!verified){
                error = "Account not activated.";
                ret = {error: error};
            }
            else{
                try{
                    const token = require("./createJWT.js");
                    ret = token.createToken(firstName, lastName, id, email);
                }
                catch(e){
                    ret = {error: e.message};
                }
            }
        }
        else{
            ret = {error: "Incorrect email or password."}
        }
        res.status(200).json(ret);
    });
    
    app.post('/api/register', async (req, res, next) =>{
    
        var error = "";
        var ret = {};
        const { email, password, firstName, lastName } = req.body;
        const emailCheck = await User.find({email: email});
        if(0 < emailCheck.length){
            error = "This email is associated with an existing account.";
            ret = {error: error};
        }
        else{
            var code = generateVerificationCode();
            const newUser = new User({_id: new ObjectId(), email: email, password: password, firstName: firstName, lastName: lastName, verificationCode: code, verified: false});
            newUser.save();
            const results = await User.find({email: email, verificationCode: code});//db.collection("Users").find({email: email}).toArray();
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
        const results = await User.find({email: email});
        if(0 < results.length){
            await User.findOneAndUpdate({email: email, verificationCode: verificationCode},{$set: {verified: true, verificationCode: null}});
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
        const results = await User.find({email: email});
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
                await User.findOneAndUpdate({email: email, verificationCode: verificationCode},{$set: {password: newPassword, verificationCode: null}});
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
        var results = await User.find({email: email});
        if(0 < results.length){
            if(results.verified === false){
                error = "Account not verified.";
            }
            else{
                var code = generateVerificationCode();
                await User.findOneAndUpdate({email: email},{$set: {verificationCode: code}});
                SendPasswordResetEmail(email, code, "https://budget-manager-group14-bacfc735e9a2.herokuapp.com/activate");
            }
        }
        else{
            error = "Account not found.";
        }
        ret = {error: error};
        res.status(200).json(ret);
    });

    app.post('/api/senddeleteaccountemail', async (req, res, next)=>{
        var error = "", ret = {};
        const{ email } = req.body;
        var results = await User.find({email: email});
        if(0 < results.length){
            if(results.verified === false){
                error = "Account not verified.";
            }
            else{
                var code = generateVerificationCode();
                await User.findOneAndUpdate({email: email},{$set: {verificationCode: code}});
                SendDeleteAccountEmail(email, code, "https://budget-manager-group14-bacfc735e9a2.herokuapp.com/deleteaccount");
            }
        }
        else{
            error = "Account not found.";
        }
        ret = {error: error};
        res.status(200).json(ret);
    });

    app.post('/api/deleteaccount', async (req, res, next)=>{
        var error = "", ret = {};
        const{ email, verificationCode} = req.body;
        var results = await User.find({email: email});
        if(0 < results.length){
            if(results[0].verified === false){
                error = "Account not verified.";
            }
            else if(results[0].verificationCode === null){
                error = "Deletion was not requested for this account.";
            }
            else if(results[0].verificationCode !== verificationCode){
                error = "Incorrect verification code.";
            }
            else{
                await User.findOneAndRemove({email: email, verificationCode: verificationCode});
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
        var token = require('./createJWT.js');

        const {userId, name, cost, month, day, year, jwtToken} = req.body;
        
        try{
            if( token.isExpired(jwtToken)){
                var r = {error:'The JWT is no longer valid', jwtToken: ''};
                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
        }

        const newExpense = new Expense({_id: new ObjectId(), userId: userId, name: name, cost: cost, month: month, day: day, year: year});
        
        try{
    
            newExpense.save();

        }
        catch(e){
            error = e.toString();
        }

        var refreshedToken = null;
        try
        {
            refreshedToken = token.refresh(jwtToken);
        }
        catch(e)
        {
            console.log(e.message);
        }
    
        var ret = {error: error, jwtToken: refreshedToken};
    
        res.status(200).json(ret);
    
    });
    
    app.post('/api/searchexpense', async (req, res, next) =>{
        var error = "";
        const { userId, queryName, queryCost, queryMonth, queryDay, queryYear, jwtToken } = req.body;
        var token = require("./createJWT.js");
        try{
            if( token.isExpired(jwtToken)){
                var r = {error:'The JWT is no longer valid', jwtToken: ''};
                res.status(200).json(r);
                return;
            }
        }
        catch(e)
        {
            console.log(e.message);
        }
        var _searchName = queryName.trim();
        var _searchCost = queryCost.trim();
        var _searchMonth = queryMonth.trim();
        var _searchDay = queryDay.trim();
        var _searchYear = queryYear.trim();
        const results = await Expense.find({"userId":userId, "name":{$regex:_searchName+".*",$options:"i"}, "cost":{$regex:_searchCost+".*"}, "day":{$regex:_searchDay+".*"}, "month":{$regex:_searchMonth+".*"}, "year":{$regex:_searchYear+".*"}});
        var _ret = [];
        for( var i=0; i<results.length; i++ )
        {
            _ret.push({name: results[i].name, cost: results[i].cost, day: results[i].day, month: results[i].month, year: results[i].year, _id: results[i]._id});
        }

        var refreshedToken = null;
        try{
            refreshedToken = token.refresh(jwtToken);
        }
        catch(e)
        {
            console.log(e.message);
        }

        var ret = {results:_ret, error:'', jwtToken: refreshedToken};
        res.status(200).json(ret);
    });
    
    app.post('/api/deleteexpense', async (req, res, next) =>{
        var error = "";
        const { userId, query } = req.body;
        await Expense.deleteOne({"userId": userId, "_id": new ObjectId(query)});
        var ret = {error:''};
        res.status(200).json(ret);
    });
}