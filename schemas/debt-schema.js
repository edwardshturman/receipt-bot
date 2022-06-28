const debtCommand = require('../commands/debt');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const debtSchema = new Schema({
    creditor: String,
    debtor: String,
    name: String,
    description: String,
    amount: Number,
    date: String
}, { collection: 'debts' });

const Debt = mongoose.model('debt', debtSchema);

module.exports = Debt;
