const errorResponseHandler = require("../helper/lib/errorResponseHandler");
const {
  getOrderList,
  getOrderById,
  confirmOrder,
  cancelOrder,
} = require("../models/orderModel");

exports.getOrderList = async (req, res) => {
  try {
    const orderList = await getOrderList();
    if (orderList.length < 1) {
      return res.response.fail(null, "order list empty", {});
    }
    return res.response.success(orderList, "Order list");
  } catch (error) {
    console.log(error);
    errorResponseHandler(res, error);
  }
};

exports.orderConfirm = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);
    if (!order) {
      return res.response.fail(null, "Order not found");
    }
    const response = await confirmOrder(id);
    return res.response.success(response, "Order confirmed successfully");
  } catch (error) {
    console.error(error);
    errorResponseHandler(res, error);
  }
};

exports.orderCancel = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);
    if (!order) {
      return res.response.fail(null, "Order not found");
    }
    const response = await cancelOrder(id);
    return res.response.success(response, "Order cancel successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
