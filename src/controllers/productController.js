const errorResponseHandler = require("../helper/lib/errorResponseHandler");
const { addProduct } = require("../models/prductModel");
const { createProductRules } = require("../validation/validationRules");
const { validate } = require("../validation/validator");

exports.addProduct = async (req, res) => {
  try {
    const { productName, price, offer, status, shippingCharge, color, size } =
      req.body;
    const image = req.file;
    validate(
      { productName, price, offer, status, image, shippingCharge, color, size },
      createProductRules
    );
    const productData = {
      productName,
      price,
      offer,
      shippingCharge,
      color,
      size,
      image: {
        data: image.buffer,
        contentType: image.mimetype,
      },
    };
    const product = await addProduct(productData);
    return res.response.success(product, "product created");
  } catch (error) {

    errorResponseHandler(res, error);
  }
};
