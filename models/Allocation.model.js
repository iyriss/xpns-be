import mongoose from 'mongoose';
const AllocationModel = new mongoose.Schema({
  kind: {
    type: String,
    enum: ['percentage', 'fix'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  members: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      portion: number,
    },
  ],
});

const Allocation = mongoose.model('Allocation', AllocationModel);

export default Allocation;
