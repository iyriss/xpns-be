import mongoose from 'mongoose';

const GroupModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  members: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    {
      validate: [arrayLimit, '{PATH} must have at least one user ID'],
    },
  ],
});

function arrayLimit(val) {
  return val.length > 0;
}

const Group = mongoose.model('Group', GroupModel);

export default Group;
