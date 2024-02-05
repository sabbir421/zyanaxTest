const errorResponseHandler = require("../helper/lib/errorResponseHandler");
const { hashPasswordFunc } = require("../helper/lib/hashPassword");
const {
  getCustomerByEmail,
  customerSignup,
  getAllCustomers,
  getCustomerById,
  changeCustomerStatus,
  updateCustomer,
} = require("../models/customerModel");
const { uuid } = require("uuidv4");
const { validate } = require("../validation/validator");
const {
  createCustomerRules,
  updateCustomerRules,
} = require("../validation/validationRules");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { variable } = require("../config/variables");
exports.customerSignup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      password: originalpassword,
      confirmPassword,
      role,
      status,
      mobile,
    } = req.body;
    validate(
      {
        firstName,
        lastName,
        userName,
        email,
        originalpassword,
        role,
        mobile,
        status,
      },
      createCustomerRules
    );

    const customer = await getCustomerByEmail(email);
    if (customer) {
      return res.response.fail(null, "Customer already exists", {});
    }
    if (originalpassword !== confirmPassword) {
      return res.response.fail(null, "password not match", {});
    }
    const customerId = uuid();
    const password = await hashPasswordFunc(originalpassword);
    const data = {
      customerId,
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword,
      role,
      status,
      mobile,
    };
    const response = await customerSignup(data);
    res.response.success(response, "Customer Create successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.customerLogin = async (req, res) => {
  try {
    const { email, password: givenPassword } = req.body;
    const customer = await getCustomerByEmail(email);
    if (!customer) {
      return res.response.fail(null, " Invalid email, password");
    }
    const match = await bcrypt.compare(givenPassword, customer.password);
    if (!match) {
      return res.response.fail(null, " Invalid email, password");
    }
    const token = jwt.sign(
      {
        id: customer._id,
        signatureId: customer.sellerId,
        firstname: customer.firstName,
        lastName: customer.lastName,
        userName: customer.userName,
        email: customer.email,
        mobile: customer.mobile,
        role: customer.role,
        status: customer.status,
      },
      variable.jwtSecret,
      { expiresIn: "2160h" }
    );
    return res.response.success(token, "customer login successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await getAllCustomers();
    if (!customers) {
      return res.response.fail(null, "Customer not found", {});
    }
    return res.response.success(customers, "Customer list");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.changeCustomerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await getCustomerById(id);
    if (!customer) {
      return res.response.fail(null, "Customer not found", {});
    }
    const status = vendor.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    await changeCustomerStatus(id, { status });
    return res.response.success("Status change successful");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await getCustomerById(id);
    if (!customer) {
      return res.response.fail(null, "Customer not found");
    }
    return res.response.success(customer, "customer fetched successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { firstName, lastName, userName, status } = req.body;
    const { id } = req.params;
    const isCustomerExist = await getCustomerById(id);
    if (!isCustomerExist) {
      return res.response.fail(null, "Customer not found");
    }
    validate(
      {
        firstName,
        lastName,
        userName,
        status,
      },
      updateCustomerRules
    );

    const data = {
      firstName,
      lastName,
      userName,
      status,
    };
    const response = await updateCustomer(id, data);
    res.response.success(response, "Customer update successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
