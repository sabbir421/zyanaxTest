const createAdminRules = {
  userId: "required|string",
  originalpassword: "required|string",
};

const createProductRules = {
  productName: "required|string",
  price: "required|string",
  offer: "required|string",
  status: "required|string|in:ACTIVE,INACTIVE",
  image: "required",
  shippingCharge: "required|string",
  color: "required|string",
  size: "required|string",
};
const createCustomerRules = {
  phone: "required|string",
  originalPassword: "required|string",
};

module.exports = {
  createAdminRules,
  createProductRules,
  createCustomerRules,
};
