const mongoose = require("mongoose");

const promocodeSchema = new mongoose.Schema(
  {
    promocode: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    discountRate: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    useTime:{
        type: Number,
        required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdOn",
      updatedAt: "updatedOn",
    },
  }
);

const Promocode = mongoose.model("Promocode", promocodeSchema);
module.exports = Promocode;
