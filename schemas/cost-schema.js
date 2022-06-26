const costCommand = require('../commands/cost');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const costSchema = new Schema({
    creditor: String,
    debtor: String,
    costName: String,
    description: String,
    amount: Number,
    date: String
}, { collection: 'costs' });

const Cost = mongoose.model('cost', costSchema);

module.exports = Cost;
