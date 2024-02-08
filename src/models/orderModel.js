const Order = require("../schema/orderSchema");

exports.checkout = async (data) => {
  const order = new Order(data);
  return order.save();
};

exports.getOrderList = async () => await Order.find();

exports.getOrderById = async (id) => await Order.findById(id);

exports.confirmOrder = async (id) => {
  try {
    // Use await to ensure that the update operation is executed
    const confirm = await Order.findByIdAndUpdate(
      id,
      { $set: { status: "CONFIRM" } },
      { new: true }
    );
    return confirm;
  } catch (error) {
    // Handle errors
    console.error("Error confirming order:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
exports.cancelOrder = async (id) => {
  const confirm = await Order.updateOne(
    { _id: id },
    { $set: { status: "CANCEL" } },
    { new: true }
  );
  return confirm;
};
