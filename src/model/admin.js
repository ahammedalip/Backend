import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  }
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
