const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId
    },
    userId: {
        type: String
    },
    name: {
        type: String
    },
    cost: {
        type: String
    },
    day: {
        type: String
    },
    month: {
        type: String
    },
    year: {
        type: String
    },
    
});
module.exports = expense = mongoose.model("Expenses", ExpenseSchema);