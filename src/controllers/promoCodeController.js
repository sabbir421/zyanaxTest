const errorResponseHandler = require("../helper/lib/errorResponseHandler");
const { createPromo } = require("../models/promocodeModel");
const { promocodeRules } = require("../validation/validationRules");
const { validate } = require("../validation/validator");

exports.createPromoCode = async (req, res) => {
  try {
    const { promocode, startDate, endDate, discountRate, useTime, status } =
      req.body;
    validate(
      { promocode, startDate, endDate, discountRate, useTime, status },
      promocodeRules
    );
    const promoData = {
      promocode,
      startDate,
      endDate,
      discountRate,
      useTime,
      status,
    };
    const response = await createPromo(promoData);
    return res.response.success(response, "Promocode created successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
