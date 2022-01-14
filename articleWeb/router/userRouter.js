const express = require("express");
const router = express.Router();
const expressJoi = require("@escook/express-joi");
const UserSchema = require("../checkingSchema/userSchema");
const userHandler = require("../routerHandler/userHandler");

//Registered user
router.post(
  "/api/reg",
  expressJoi(UserSchema.reg_login_schema),
  userHandler.regUser
);

//log on user
router.post(
  "/api/log",
  expressJoi(UserSchema.reg_login_schema),
  userHandler.logUser
);

//Get user information
router.get("/account/getinfo", userHandler.getUser);

//Update user information
router.post(
  "/account/setting",
  expressJoi(UserSchema.update_userinfo_schema),
  userHandler.setUser
);

//reset password
router.post(
  "/account/setpassword",
  expressJoi(UserSchema.password_schema),
  userHandler.setPassword
);


module.exports = router;
