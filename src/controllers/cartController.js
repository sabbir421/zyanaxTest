const errorResponseHandler = require("../helper/lib/errorResponseHandler");
const {
  addTocart,
  getProductById,
  removeProductFromCart,
} = require("../models/cartModel");

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await getProductById(productId);
    if (!product) {
      return res.response.fail(null, "product not found", {});
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
      quantity,
    });
    return res.response.success(cart, "add to cart successfully");
  } catch (error) {
    console.log(error);
    errorResponseHandler(res, error);
  }
};

exports.removeProductFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await removeProductFromCart(id);
    return res.response.success({}, "Remove product from cart");
  } catch (error) {
    console.log(error);
    errorResponseHandler(res, error);
  }
};
