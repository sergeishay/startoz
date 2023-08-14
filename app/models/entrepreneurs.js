import mongoose from 'mongoose';

const EntrepreneurSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming you have a User model.
  companyName: String,
  email: String, // This could also be fetched from the User model if you store the email there.
  phone: String,
  country: String,
  city: String,
  yearsOfExperience: String, // This could also be a Number depending on your requirements.
  aboutMyIvest: String, // Note: It's typically preferred to use camelCase for property names.
  companyWebsite: String,
  description: String,
  profilePhoto: String, // Assuming you're storing the direct URL as string.
  linkedinProfile: String,
  sector: String,
});

export default mongoose.models.Entrepreneur || mongoose.model('Entrepreneur', EntrepreneurSchema);
