const mongoose = require("mongoose");

const summerySchema = new mongoose.Schema(
  {
    subTotal: {
      type: Number,
      Required: true,
    },
    totalPayable: {
      type: Number,
      Required: true,
    },
    discount: {
      type: Number,
      Required: true,
    },
    status: {
      type: String,
      Required: true,
      default: "PENDING",
    },
    shippingCharge: {
      type: Number,
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
const Summery = mongoose.model("Summery", summerySchema);
module.exports = Summery;
