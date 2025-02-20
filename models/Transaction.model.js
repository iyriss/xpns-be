import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    subdescription: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
    },
    group: {
      type: mongoose.Types.ObjectId,
      ref: 'Group',
    },
    allocation: {
      type: mongoose.Types.ObjectId,
      ref: 'Allocation',
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    billStatement: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'BillStatement',
    },
    type: {
      type: String,
      enum: ['Debit', 'Credit'],
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
