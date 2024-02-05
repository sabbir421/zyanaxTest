const Admin = require("../schema/adminSchema");

exports.createAdmin = async (data) => {
  const admin = new Admin(data);
  return admin.save();
};
exports.getAdminByUserId = async (userId) => Admin.findOne({ userId });
