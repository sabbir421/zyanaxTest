const express = require("express");
const healthRoute = require("./health/healthRoute");
const router = express.Router();
const adminRoute = require("./admin/adminRoute");
const customerRoute = require("./customer/customerRoute");
const productRoute = require("./product/productRoute");
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
    path: "/customer",
    route: customerRoute,
  },
  {
    path: "/product",
    route: productRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
