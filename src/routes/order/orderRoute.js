const express = require("express");
const { getOrderList } = require("../../controllers/orderController");

const router = express.Router();
router.get("/list", getOrderList);
module.exports = router;
