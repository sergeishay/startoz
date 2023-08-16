import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Assuming you have a User model.
  profilePhoto: String, // Assuming you're storing the direct URL as string.
  companyType: String,
  companyName: String,
  serviceType: [String], // This is an array of strings as indicated.
  yearsOfExperience: String, // This could also be a Number depending on your requirements.
  description: String,
  country: String,
  state: String,
  city: String,
  email: String, // This could also be fetched from the User model if you store the email there.
  companyEmail: String,
  phone: String,
  companyWebsite: String,
  linkedinProfile: String,
});

export default mongoose.models.Service ||
  mongoose.model("Service", ServiceSchema);