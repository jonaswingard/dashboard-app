import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String,
  },
  created_at: Date,
  updated_at: Date,
});

userSchema.pre('save', function (next) {
  const currentDate = new Date();
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
