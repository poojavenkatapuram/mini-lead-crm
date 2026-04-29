const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    phone: String,
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST'],
      default: 'NEW'
    },
    source: String
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model('Lead', leadSchema);