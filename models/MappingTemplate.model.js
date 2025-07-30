import mongoose from 'mongoose';

const MappingTemplateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    headers: {
      type: [String],
      required: true,
    },
    mapping: {
      type: Object,
      required: true,
    },
    hasHeaderRow: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const MappingTemplate = mongoose.model(
  'MappingTemplate',
  MappingTemplateSchema
);

export default MappingTemplate;
