const debtCommand = require('../commands/debt');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const debtSchema = new Schema({
    name: String,
    creditorId: String,
    debtorId: String,
    description: String,
    amount: Number,
    date: String
}, { collection: 'debts' });

const Debt = mongoose.model('debt', debtSchema);

module.exports = Debt;
