const joi = require("joi");

const username = joi.string().alphanum().min(1).max(10).required();
const password = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
const u_face = joi.string().dataUri().required();

exports.reg_login_schema = {
  body: {
    username,
    password,
  },
};

exports.update_userinfo_schema = { body: { username } };

exports.face_Schema = { body: { u_face } };

exports.password_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref("oldPwd")).concat(password),
  },
};
