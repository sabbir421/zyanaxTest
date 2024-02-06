const Promocode = require("../schema/promoCodeSchema");

exports.createPromo = async (data) => {
  const promo = new Promocode(data);
  return promo.save();
};
