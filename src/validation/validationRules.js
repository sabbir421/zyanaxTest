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
  size: "required|string|in:S,M,L,XL,XXL,XXXL",
};

const updateAdminRules = {
  firstName: "required|string",
  lastName: "required|string",
  userName: "required|string",
  mobile: "required|string",
  status: "required|string|in:PENDING,PROCESSING,ACTIVE,INACTIVE,SUSPENDED",
};
const updateVendorRules = {
  firstName: "required|string",
  lastName: "required|string",
  userName: "required|string",
  mobile: "required|string",
  status: "required|string|in:PENDING,PROCESSING,ACTIVE,INACTIVE,SUSPENDED",
};
const updateSellerRules = {
  firstName: "required|string",
  lastName: "required|string",
  userName: "required|string",
  status: "required|string|in:PENDING,PROCESSING,ACTIVE,INACTIVE,SUSPENDED",
};
const updateCustomerRules = {
  firstName: "required|string",
  lastName: "required|string",
  userName: "required|string",
  status: "required|string|in:PENDING,PROCESSING,ACTIVE,INACTIVE,SUSPENDED",
};

const createVendorRules = {
  firstName: "required|string",
  lastName: "required|string",
  userName: "required|string",
  email: "required|string|email",
  mobile: "required|string",
  password: "required|string",
  role: "required|string|in:VENDOR",
  status: "required|string|in:PENDING,PROCESSING,ACTIVE,INACTIVE,SUSPENDED",
};

const createCustomerRules = {
  firstName: "required|string",
  lastName: "required|string",
  userName: "required|string",
  email: "required|string|email",
  mobile: "required|string",
  originalpassword: "required|string",
  role: "required|string|in:CUSTOMER",
  status: "required|string|in:PENDING,PROCESSING,ACTIVE,INACTIVE,SUSPENDED",
};

module.exports = {
  createAdminRules,
  updateAdminRules,
  createVendorRules,
  createProductRules,
  updateSellerRules,
  createCustomerRules,
  updateVendorRules,
  updateCustomerRules,
};
