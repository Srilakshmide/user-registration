const Hapi = require("@hapi/hapi");
const authController = require("../controllers/authController");

const routes = [
  { method: "POST", path: "/register", handler: authController.registerUser },
  { method: "POST", path: "/login", handler: authController.loginUser },
  { method: "POST", path: "/verify-otp", handler: authController.verifyOTP },
  { method: "POST", path: "/delete-account", handler: authController.deleteAccount },
];

module.exports = routes;
