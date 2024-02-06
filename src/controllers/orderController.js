const errorResponseHandler = require("../helper/lib/errorResponseHandler");
const { getOrderList } = require("../models/orderModel");

exports.getOrderList = async (req, res) => {
  try {
    const orderList = await getOrderList();
    if (orderList.length < 1) {
      return res.response.fail(null, "order list empty", {});
    }
    return res.response.success(orderList,"Order list")
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
