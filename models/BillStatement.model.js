import mongoose from 'mongoose';
const BillStatementSchema = new mongoose.Schema(
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

const BillStatement = mongoose.model('BillStatement', BillStatementSchema);

export default BillStatement;
