import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
  },
  image: {
    type: String,
  },
  password:{
    type: String,
  },
  isFirstVisit: {
    type: Boolean,
    default: true,
  },
  roles: {
    type: [String], 
    default: []
  }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
