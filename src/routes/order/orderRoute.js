const express = require("express");
const {
  getOrderList,
  orderConfirm,
} = require("../../controllers/orderController");

const router = express.Router();
router.get("/list", getOrderList);
router.put("/confirm/:id", orderConfirm);
module.exports = router;
