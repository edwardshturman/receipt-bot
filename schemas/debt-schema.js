import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const debtSchema = new Schema({
    name: String,
    creditorId: String,
    debtorId: String,
    description: String,
    amount: Number
}, { collection: 'debts' });

const Debt = mongoose.model('debt', debtSchema);

export default Debt;
