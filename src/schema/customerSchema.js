const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      Required: true,
    },

    password: {
      type: String,
      Required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdOn",
      updatedAt: "updatedOn",
    },
  }
);
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
