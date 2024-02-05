const Customer = require("../schema/customerSchema");

exports.customerSignup = async (data) => {
  const admin = new Customer(data);
  return admin.save();
};
exports.getCustomerByPhone = async (phone) => Customer.findOne({ phone });
