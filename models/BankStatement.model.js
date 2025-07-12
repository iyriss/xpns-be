import mongoose from 'mongoose';
const BankStatementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const BankStatement = mongoose.model('BankStatement', BankStatementSchema);

export default BankStatement;
