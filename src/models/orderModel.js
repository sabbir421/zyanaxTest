const Order = require("../schema/orderSchema");

exports.checkout = async (data) => {
  const order = new Order(data);
  return order.save();
};

exports.getOrderList = async () => await Order.find();
