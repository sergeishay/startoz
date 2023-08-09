import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming you have a User model.
  companyName: String,
  email: String, // This could also be fetched from the User model if you store the email there.
  phone: String,
  country: String,
  city: String,
  serviceType: [String], // This is an array of strings as indicated.
  yearsOfExperience: String, // This could also be a Number depending on your requirements.
  experience: String,
  aboutMyService: String, // Note: It's typically preferred to use camelCase for property names.
  companyWebsite: String,
  description: String,
  profilePhoto: String, // Assuming you're storing the direct URL as string.
  linkedinProfile: String,
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
