const { default: mongoose } = require("mongoose");
const Promocode = require("../schema/promoCodeSchema");

exports.createPromo = async (data) => {
  const promo = new Promocode(data);
  return promo.save();
};

exports.updatePromo = async (id, data) => {
  const updatedPromo = await Promocode.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true }
  );
  return updatedPromo;
};

exports.promoList = async () => await Promocode.find();
