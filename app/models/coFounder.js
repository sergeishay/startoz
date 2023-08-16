import mongoose from "mongoose";

const CoFounderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  profilePhoto: String, // Assuming you're storing the direct URL as string.
  profession: String,
  lookingToBe: [String], // array of strings
  desiredSectors: [String], // array of strings
  yearsOfExperience: String, // This could also be a Number depending on your requirements.
  skills: [String], // array of strings
  description: String,
  dateOfBirth: Date,
  country: String,
  state: String,
  city: String,
  phone: String,
  personalWebsite: String,
  linkedInProfile: String,
  cv: String,
});

export default mongoose.models.CoFounder ||
  mongoose.model("CoFounder", CoFounderSchema);