const errorResponseHandler = require("../helper/lib/errorResponseHandler");
const { orderSummery } = require("../models/cartModel");
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
    const discountedPrice = price - price * (offer / 100);
    const productData = {
      productName,
      price: discountedPrice,
      offer,
      shippingCharge,
      color,
      status,
      size,
      image: {
        data: image.buffer,
        contentType: image.mimetype,
      },
    };

    const product = await addProduct(productData);

    return res.response.success(product, "Product created");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.orderSummary = async (req, res) => {
  try {
    const cartProducts = await orderSummery();
    let totalProducts = cartProducts.length;
    let subTotal = 0;
    let shippingCharge = 0;
    for (const product of cartProducts) {
      const productTotalPrice = product.price * (product.quantity || 1);
      subTotal += productTotalPrice;
      shippingCharge += product.shippingCharge;
    }

    const summery = { subTotal, totalProducts, shippingCharge };
    return res.response.success(summery, "order Summery");
  } catch (error) {
    console.log(error);
    errorResponseHandler(res, error);
  }
};
