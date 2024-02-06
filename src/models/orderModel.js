const Order = require("../schema/orderSchema");

exports.checkout = async (data) => {
  const order = new Order(data);
  return order.save();
};

exports.getOrderList = async () => await Order.find();

exports.getOrderById = async (id) => await Order.findById(id);

exports.confirmOrder = async (id) => {
  const confirm = Order.findByIdAndUpdate(
    id,
    { $set: { status: "CONFIRM" } },
    { new: true }
  );
  return confirm;
};
exports.cancelOrder = async (id) => {
  const confirm = Order.findByIdAndUpdate(
    id,
    { $set: { status: "CANCEL" } },
    { new: true }
  );
  return confirm;
};
