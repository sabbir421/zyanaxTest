const mongoose = require("mongoose");

const carttSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      Required: true,
    },
    price: {
      type: Number,
      Required: true,
    },
    offer: {
      type: Number,
      Required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    status: {
      type: String,
      Required: true,
    },
    shippingCharge: {
      type: Number,
      Required: true,
    },
    color: {
      type: String,
      Required: true,
    },
    size: {
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
const Cart = mongoose.model("Cart", carttSchema);
module.exports = Cart;
