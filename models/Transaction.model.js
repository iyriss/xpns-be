const mongoose = require('mongoose');

const SplitSchema = new mongoose.Schema({
  type: {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    amount: {
      type: Number,
      required: true,
    },
    portion: {
      type: String,
      enum: ['100', '0', '50', 'custom'],
      required: true,
    },
    kind: {
      type: String,
      enum: ['percentage', 'fix'],
      required: true,
    },
  },
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
    split: {
      type: SplitSchema,
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

module.exports = Transaction;
