const express = require("express");
const {
  createPromoCode,
  updatePromo,
  promoList,
} = require("../../controllers/promoCodeController");

const router = express.Router();
router.post("/add", createPromoCode);
router.patch("/update/:id", updatePromo);
router.get("/list", promoList);
module.exports = router;
