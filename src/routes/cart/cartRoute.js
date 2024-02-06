const express = require("express");
const {
  addToCart,
  removeProductFromCart,
  getCartList,
} = require("../../controllers/cartController");

const router = express.Router();
router.post("/add", addToCart);
router.get("/list",getCartList)
router.delete("/remove/:id", removeProductFromCart);
module.exports = router;
