const errorResponseHandler = require("../helper/lib/errorResponseHandler");
const { hashPasswordFunc } = require("../helper/lib/hashPassword");
const { createAdmin, getAdminByUserId,} = require("../models/adminModel");
const { createAdminRules } = require("../validation/validationRules");
const { validate } = require("../validation/validator");
const { variable } = require("../config/variables");
const jwt = require("jsonwebtoken");

exports.createAdmin = async (req, res) => {
  try {
    const { originalpassword, userId } = req.body;
    const admin = await getAdminByUserId(userId);
    if (admin) {
      if (admin) {
        const token = jwt.sign(
          {
            userId: admin.userId,
          },
          variable.jwtSecret,
          { expiresIn: "2160h" }
        );
        return res.response.success(token, "Admin login successfully");
      }
    }
    validate(
      {
        originalpassword,
        userId,
      },
      createAdminRules
    );
    const password = await hashPasswordFunc(originalpassword);
    const data = {
      password,
      userId,
    };
    const response = await createAdmin(data);
    const token = jwt.sign(
      {
        userId: response.userId,
      },
      variable.jwtSecret,
      { expiresIn: "2160h" }
    );
    return res.response.success(token, "Admin login Successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
