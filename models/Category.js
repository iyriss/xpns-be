import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: String,
    type: {
      type: String,
      enum: [
        'essentials',
        'lifestyle',
        'wellness',
        'financial',
        'pet',
        'other',
      ],
      required: true,
    },
    userId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', CategorySchema);

export default Category;
