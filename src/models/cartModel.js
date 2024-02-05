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
