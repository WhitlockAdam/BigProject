const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    verificationCode: { 
        type: String
    },
    verified: {
        type: Boolean
    }

});
module.exports = user = mongoose.model("Users", UserSchema);