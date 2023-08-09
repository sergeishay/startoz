import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  public_id: {
    type: String,
  },
  secure_url: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  src: {
    type: String,
    required: true,
    unique: true,
  },
  size: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);
