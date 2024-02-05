const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    userId: {
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
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
