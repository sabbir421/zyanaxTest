const Order = require("../schema/orderSchema");
const Summery = require("../schema/summerySchema");

exports.checkout = async (data) => {
  const order = new Summery(data);
  return order.save();
};

exports.getOrderList = async () => await Summery.find();

exports.getOrderById = async (id) => await Summery.findById(id);

exports.confirmOrder = async (id) => {
  try {
    const confirm = await Summery.findByIdAndUpdate(
      id,
      { $set: { status: "CONFIRM" } },
      { new: true }
    );
    return confirm;
  } catch (error) {
    console.error("Error confirming order:", error);
    throw error;
  }
};
exports.cancelOrder = async (id) => {
  const confirm = await Summery.updateOne(
    { _id: id },
    { $set: { status: "CANCEL" } },
    { new: true }
  );
  return confirm;
};
