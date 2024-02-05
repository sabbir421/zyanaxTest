const express = require("express");
const healthRoute = require("./health/healthRoute");
const router = express.Router();
const adminRoute = require("./admin/adminRoute");
const customerRoute = require("./customer/customerRoute");
const defaultRoutes = [
  {
    path: "/check",
    route: healthRoute,
  },
  {
    path: "/admin",
    route: adminRoute,
  },

  {
    path: "/auth/customer",
    route: customerRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
