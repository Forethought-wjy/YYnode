const mongoose = require("../db");
var UserSchema = mongoose.Schema({
  uid: { type: Number, required: true, index: true },
  username: { type: String, required: true, maxlength: 10, minlength: 1 },
  password: { type: String, required: true },
  u_face: { type: String },
});

var UserModel = mongoose.model("user", UserSchema, "user");
module.exports = UserModel;
