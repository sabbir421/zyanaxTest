const express = require("express");
const {
  addToCart,
  removeProductFromCart,
} = require("../../controllers/cartController");

const router = express.Router();
router.post("/add", addToCart);
router.delete("/remove/:id", removeProductFromCart);
module.exports = router;
