const express = require("express");
const { customerSignup } = require("../../controllers/customerController");
const router = express.Router();

router.post("/signup", customerSignup);

module.exports = router;
