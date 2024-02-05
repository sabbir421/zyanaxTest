const errorResponseHandler = require("../helper/lib/errorResponseHandler");
const { hashPasswordFunc } = require("../helper/lib/hashPassword");
const {
  customerSignup,
  getCustomerByPhone,
} = require("../models/customerModel");
const { validate } = require("../validation/validator");
const { createCustomerRules } = require("../validation/validationRules");
const jwt = require("jsonwebtoken");
const { variable } = require("../config/variables");
exports.customerSignup = async (req, res) => {
  try {
    const { phone, originalPassword } = req.body;
    validate(
      {
        phone,
        originalPassword,
      },
      createCustomerRules
    );

    const customer = await getCustomerByPhone(phone);
    if (customer) {
      const token = jwt.sign(
        {
          userId: customer.phone,
        },
        variable.jwtSecret,
        { expiresIn: "2160h" }
      );
      return res.response.success(token, "Customer signup successfully");
    }

    const password = await hashPasswordFunc(originalPassword);
    const data = {
      phone,
      password,
    };
    const response = await customerSignup(data);
    const token = jwt.sign(
      {
        userId: response.phone,
      },
      variable.jwtSecret,
      { expiresIn: "2160h" }
    );
    return res.response.success(token, "Admin login Successfully");
  } catch (error) {
    console.log(error);
    errorResponseHandler(res, error);
  }
};
