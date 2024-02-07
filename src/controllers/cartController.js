const errorResponseHandler = require("../helper/lib/errorResponseHandler");
const {
  addTocart,
  getProductById,
  removeProductFromCart,
  getCartList,
  updateCart,
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
      singlePrice:price
    });
    return res.response.success(cart, "add to cart successfully");
  } catch (error) {
    console.log(error);
    errorResponseHandler(res, error);
  }
};
exports.getCartList = async (req, res) => {
  try {
    const cartList = await getCartList();
    if (cartList.length < 1) {
      return res.response.fail(null, "cart list is empty");
    }
    return res.response.success(cartList, "Cart list");
  } catch (error) {
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

exports.updateCart = async (req, res) => {
  try {
    const { _id, singlePrice, quantity } = req.body;
    const newPrice = singlePrice * quantity;
    const response = await updateCart(_id, newPrice, quantity);
    return res.response.success(response, "cart update");
  } catch (error) {
    console.log(error);
    errorResponseHandler(res, error);
  }
};
