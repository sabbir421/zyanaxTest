const express = require("express");
const {
  addToCart,
  removeProductFromCart,
  getCartList,
  updateCart,
} = require("../../controllers/cartController");

const router = express.Router();
router.post("/add", addToCart);
router.get("/list", getCartList);
router.delete("/remove/:id", removeProductFromCart);
router.patch("/update", updateCart);
module.exports = router;
