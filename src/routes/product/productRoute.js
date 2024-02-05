const express = require("express");
const multer = require("multer");
const { addProduct, orderSummary } = require("../../controllers/productController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/add", upload.single("image"), addProduct);
router.get("/summery",orderSummary)

module.exports = router;
