const costCommand = require('../commands/cost');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupCostSchema = new Schema({
    creditor: String,
    costName: String,
    description: String,
    amount: Number,
    date: String
}, { collection: 'groupCosts' });

const GroupCost = mongoose.model('groupCost', groupCostSchema);

module.exports = GroupCost;
