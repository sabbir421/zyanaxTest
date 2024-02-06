const Product = require("../schema/productSchema");

exports.addProduct = async (data) => {
  try {
    const newProduct = new Product(data);
    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw error;
  }
};
exports.getProductList = async () => await Product.find();
