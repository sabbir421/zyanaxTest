const fs = require("fs");

const errorResponseHandler = require("../helper/lib/errorResponseHandler");
const {
  orderSummery,
  getCartList,
  removeProductFromCart,
} = require("../models/cartModel");
const { checkout } = require("../models/orderModel");
const { addProduct, getProductList } = require("../models/prductModel");
const { createProductRules } = require("../validation/validationRules");
const { validate } = require("../validation/validator");

exports.addProduct = async (req, res) => {
  try {
    const { productName, price, offer, status, shippingCharge, color, size } =
      req.body;
    const imageUrl = req.file.buffer.toString("base64");
    validate(
      {
        productName,
        price,
        offer,
        status,
        shippingCharge,
        color,
        size,
        image: imageUrl,
      },
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
      image: imageUrl,
    };

    const product = await addProduct(productData);

    return res.response.success(product, "Product created");
  } catch (error) {
    console.error(error);
    errorResponseHandler(res, error);
  }
};

exports.getProductList = async (req, res) => {
  try {
    const products = await getProductList();
    if (products.length < 1) {
      return res.response.fail(null, "Product list empty");
    }
    return res.response.success(products, "Product list");
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
      const productTotalPrice = product.price;
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

exports.checkout = async (req, res) => {
  try {
    const orderList = await getCartList();
    let singleOrder = {};
    for (const order of orderList) {
      singleOrder = order;
      const { productName, price, offer, shippingCharge, color, size, image } =
        singleOrder;
      const orderDetails = {
        productName,
        price,
        offer,
        shippingCharge,
        color,
        size,
        image,
      };

      await checkout(orderDetails);
      await removeProductFromCart(singleOrder._id);
    }
    return res.response.success({}, "checkout");
  } catch (error) {
    console.log(error);
    errorResponseHandler(res, error);
  }
};
