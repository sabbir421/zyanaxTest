const errorResponseHandler = require("../helper/lib/errorResponseHandler");
const {
  createPromo,
  updatePromo,
  promoList,
} = require("../models/promocodeModel");
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
    console.log(error);
    errorResponseHandler(res, error);
  }
};

exports.updatePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const { promocode, startDate, endDate, discountRate, useTime, status } =
      req.body;
    validate(
      { promocode, startDate, endDate, discountRate, useTime, status },
      promocodeRules
    );
    const updatedData = {
      promocode,
      startDate,
      endDate,
      discountRate,
      useTime,
      status,
    };
    const response = await updatePromo(id, updatedData);
    return res.response.success(response, "promocode updated successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.promoList = async (req, res) => {
  try {
    const promocodeLit = await promoList();
    if (promocodeLit < 1) {
      return res.response.fail(null, "Promo list empty");
    }
    return res.response.success(promocodeLit, "promo list");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
