const errorResponseHandler = require("../helper/lib/errorResponseHandler");
const { addTocart, getProductById } = require("../models/cartModel");

exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await getProductById(productId);
    if (!product) {
      return res.res.fail(null, "product not found", {});
    }
    const { productName, price, offer, color, size, shippingCharge, image } =
      product;
    const cart = await addTocart({
      productName,
      price,
      offer,
      color,
      size,
      shippingCharge,
      image,
    });
    return res.response.success(cart, "add to cart successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
