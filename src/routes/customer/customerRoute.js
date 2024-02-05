const express = require("express");
const {
  customerSignup,
  customerLogin,
  changeCustomerStatus,
  getCustomerById,
} = require("../../controllers/customerController");
const authenticate = require("../../helper/lib/authenticate");
const restrictTo = require("../../helper/lib/resticted");
const router = express.Router();

router.post("/signup", customerSignup);
router.post("/login", customerLogin);
router.patch(
  "/status/:id",
  authenticate,
  restrictTo("CUSTOMER"),
  changeCustomerStatus
);
router.get("/details/:id", authenticate, getCustomerById);
router.get("/update/:id", authenticate, getCustomerById);

module.exports = router;
