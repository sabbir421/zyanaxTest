const Cart = require("../schema/cartSchema");
const Product = require("../schema/productSchema");

exports.addTocart = async (data) => {
  const product = new Cart(data);
  return product.save();
};
exports.getProductById = async (id) => {
  try {
    return await Product.findById(id, {
      _id: 0,
      updatedOn: 0,
      createdOn: 0,
    });
  } catch (error) {
    throw error;
  }
};

exports.removeProductFromCart = async (id) => await Cart.findByIdAndDelete(id);

exports.orderSummery = async () => {
  try {
    return await Cart.find(
      {},
      { price: 1, quantity: 1, shippingCharge: 1, _id: 0 }
    );
  } catch (error) {
    throw error;
  }
};
exports.getCartList = async () => await Cart.find();

exports.updateCart = async (id, updatePrice, quantity) => {
  const response = await Cart.findByIdAndUpdate(
    { _id: id },
    { $set: { price: updatePrice, quantity: quantity } },
    { new: true }
  );
  return response;
};
