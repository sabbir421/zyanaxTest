const express = require("express");
const multer = require("multer");
const {
  addProduct,
  orderSummary,
  checkout,
  getProductList,
} = require("../../controllers/productController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/add", upload.single("image"), addProduct);
router.get("/summery", orderSummary);
router.get("/list", getProductList);
router.post("/checkout", checkout);

module.exports = router;
