import mongoose from 'mongoose';

const CoFounderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  phoneNumber: String,
  profession: String,
  lookingToBe: [String], // array of strings
  desiredSectors: [String], // array of strings
  country: String,
  city: String,
  dateOfBirth: Date,
  aboutMe: String,
  experience: String,
  skills: [String], // array of strings
  personalWeb: String,
  linkedInProfileLink: String,
  cv: String // You could store file path if file is uploaded or base64 string.
});

export default mongoose.models.CoFounder || mongoose.model('CoFounder', CoFounderSchema);
