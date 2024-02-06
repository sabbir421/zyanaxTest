const express = require("express");
const { createPromoCode } = require("../../controllers/promoCodeController");

const router = express.Router();
router.post("/add", createPromoCode);

module.exports = router;
