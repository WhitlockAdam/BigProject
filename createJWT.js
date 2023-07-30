const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = 
function(firstName, lastName, id, email){
    return _createToken(firstName, lastName, id, email);
}

_createToken = function(firstName, lastName, id, email){
    try{
        const expiration = new Date();
        const user = {userId: id, firstName: firstName, lastName: lastName, email: email};  
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'});
        var ret = {accessToken: accessToken, error: ""};
    }   
    catch(e){
        var ret = {error: e.message};
    }
    return ret;
}

exports.isExpired = 
function(token){
    var isError = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, verifiedJWT) =>{
        return err ? true : false;
    });
    return isError;
}

exports.refresh =
function(token){
    var ud = jwt.decode(token, {complete: true});
    var userId = ud.payload.userId;
    var firstName = ud.payload.firstName;
    var lastName = ud.payload.lastName;
    var email = ud.payload.email;
    return _createToken(firstName, lastName, userId, email);
}