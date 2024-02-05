const Customer = require("../schema/customerSchema");

exports.getCustomerByEmail = async (email) => {
  const response = await Customer.findOne({ email });
  return response;
};

exports.customerSignup = async (data) => {
  const customer = new Customer(data);
  return customer.save();
};

exports.getAllCustomers = async () => Customer.findAll();

exports.getCustomerById = async (id) => Customer.findOne({ _id: id });

exports.changeCustomerStatus = async (id, status) =>
  await Customer.findOneAndUpdate({ _id: id }, { $set: status });

exports.updateCustomer = async (id, data) => {
  const updatedCustomer = await Customer.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );
  return updatedCustomer;
};
