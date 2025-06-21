import mongoose from 'mongoose';

const AllocationSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true,
  },
  members: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      portion: {
        type: Number,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
});

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
      type: AllocationSchema,
    },
    user: {
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
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
