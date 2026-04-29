const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  profilePhoto: { type: String },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
