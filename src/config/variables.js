require('dotenv').config();
const mongoConnectUrl = process.env.MONGO_CONNECTION_STRING;
const port = process.env.PORT;
const jwtSecret = process.env.JWT_SECRET_KEY;
const roles = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
};
const status = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};
exports.variable = {
  mongoConnectUrl,
  port,
  jwtSecret,
  roles,
  status,
};
