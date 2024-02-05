const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      Required: true,
    },
    userName: {
      type: String,
      Required: true,
    },
    mobile: {
      type: String,
      Required: true,
    },
    email: {
      type: String,
      Required: true,
    },
    password: {
      type: String,
      Required: true,
    },
    role: {
      type: String,
      Required: true,
    },
    status: {
      type: String,
      Required: true,
      enum: ['PENDING', 'PROCESSING', 'ACTIVE', 'INACTIVE', 'SUSPENDED'],
      default: 'ACTIVE',
    },
  },
  {
    timestamps: {
      createdAt: 'createdOn',
      updatedAt: 'updatedOn',
    },
  },
);
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
