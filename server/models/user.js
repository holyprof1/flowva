const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  onboarding: {
    role: { type: String },
    work: { type: [String] },
    workOther: { type: String },
    country: { type: String },
    tools: { type: [String] },
    goals: { type: [String] }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);