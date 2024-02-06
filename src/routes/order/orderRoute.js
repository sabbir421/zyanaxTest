const express = require("express");
const {
  getOrderList,
  orderConfirm,
  orderCancel,
} = require("../../controllers/orderController");

const router = express.Router();
router.get("/list", getOrderList);
router.put("/confirm/:id", orderConfirm);
router.put("/cancel/:id", orderCancel);
module.exports = router;
