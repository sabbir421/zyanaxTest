const Order = require("../schema/orderSchema");

exports.checkout = async (data) => {
  const order = new Order(data);
  return order.save();
};
