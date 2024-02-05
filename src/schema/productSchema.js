const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
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
    shippingCharge:{
        type:Number,
        Required:true
    },
    color:{
        type:String,
        Required:true
    },
    size:{
        type:String,
        Required:true
    }
  },
  {
    timestamps: {
      createdAt: "createdOn",
      updatedAt: "updatedOn",
    },
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
