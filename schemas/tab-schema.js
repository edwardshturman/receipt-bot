const tabCommand = require('../commands/tab');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tabSchema = new Schema({
    name: String,
    creditorId: String,
    roleId: String,
    members: Array
}, { collection: 'tabs' });

const Tab = mongoose.model('tab', tabSchema);

module.exports = Tab;
