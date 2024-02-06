const express = require("express");
const {
  createPromoCode,
  updatePromo,
} = require("../../controllers/promoCodeController");

const router = express.Router();
router.post("/add", createPromoCode);
router.patch("/update/:id", updatePromo);
module.exports = router;
