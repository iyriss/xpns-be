const mongoose = require('mongoose');

const SplitSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['100', '0', '50', 'custom'], // Allowed values
    required: true,
  },
  mine: {
    type: Number,
    required: true,
  },
  other: {
    type: Number,
    required: true,
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
    // split: {
    //   type: SplitSchema,
    //   required: true,
    // },
    // owner: {
    //   type: mongoose.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    billStatement: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'BillStatement',
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
