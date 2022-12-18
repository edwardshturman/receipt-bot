import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tabSchema = new Schema({
    name: String,
    roleId: String,
    members: Array
}, { collection: 'tabs' });

const Tab = mongoose.model('tab', tabSchema);

export default Tab;
