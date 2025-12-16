const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  
  // Custom AI Info
  reqAiName: { type: String },
  reqDevName: { type: String },
  isApproved: { type: Boolean, default: false },
  
  // New Fields for Profile & API
  personalApiKey: { type: String, unique: true, sparse: true }, // Key milik user untuk cURL
  avatarUrl: { type: String, default: '' } // URL Foto Profil
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
