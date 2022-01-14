const bcrybt = require("bcryptjs");
const UserModel = require("../Model/UserModel");
const GenId = require("../Utils/GenId");
const genId = new GenId({ WorkerId: 1 });
const jwt = require("jsonwebtoken");
const config = require("../config/config");

//Registered user
exports.regUser = (req, res) => {
  const userInfo = req.body;
  UserModel.find({ username: userInfo.username }, (err, doc) => {
    if (err) {
      return res.cc(err);
    }

    if (doc.length > 0) {
      //   return res.send({ message: "username exists" });
      return res.cc("username exists");
    }
  });
  userInfo.password = bcrybt.hashSync(userInfo.password, 10);

  var user = new UserModel({
    uid: genId.NextId(),
    username: userInfo.username,
    password: userInfo.password,
  });

  user.save((err, doc) => {
    if (err) {
      return res.cc(err);
    }
    console.log("success add");
    res.send(doc);
  });
};

//log on user
exports.logUser = (req, res) => {
  const userInfo = req.body;
  UserModel.find({ username: userInfo.username }, (err, doc) => {
    if (err) {
      return res.cc(err);
    }

    if (doc.length == 0) {
      return res.cc("You are not registered");
    }

    //判断密码
    const compareResult = bcrybt.compareSync(
      userInfo.password,
      doc[0].password
    );

    if (!compareResult) {
      return res.cc("Login failed, password error");
    }

    const user = { ...doc[0], password: "", u_face: "" };
    const tokenStr = jwt.sign(user, config.secretKey, config.expiresIn);

    res.send({
      status: 200,
      message: "Login successful",
      token: "Bearer " + tokenStr,
    });
  });
};

//Get user information
exports.getUser = (req, res) => {
  const userInfo = req.user._doc;
  UserModel.find({ uid: userInfo.uid }, (err, doc) => {
    if (err) {
      return res.cc(err);
    }

    if (doc.length !== 1) {
      return res.cc("Failed to get user information");
    }

    res.send({
      status: 1,
      message: "Get user information",
      data: doc[0],
    });
  });
};

//Update user information
exports.setUser = (req, res) => {
  const userInfo = req.user._doc;
  UserModel.updateOne(
    { uid: userInfo.uid },
    { username: req.body.username },
    (err, doc) => {
      if (err) {
        return res.cc(err);
      }
      res.cc("User information updated successfully", 1);
    }
  );
};

//reset password
exports.setPassword = (req, res) => {
  const userInfo = req.user._doc;
  UserModel.find({ uid: userInfo.uid }, (err, doc) => {
    if (err) {
      return res.cc(err);
    }

    if (doc.length !== 1) {
      return res.cc("user does not exist");
    }

    const compareResult = bcrybt.compareSync(req.body.oldPwd, doc[0].password);
    if (!compareResult) {
      return res.cc("Old password error");
    }
  });

  const newPwd = bcrybt.hashSync(req.body.newPwd, 10);
  UserModel.updateOne(
    { uid: userInfo.uid },
    { password: newPwd },
    (err, doc) => {
      if (err) {
        return res.cc(err);
      }
      if (doc.length == 0) {
        return res.cc("Failed to update password");
      }
      res.cc("successful", 1);
    }
  );
};

//change the avatar
exports.setFace = (req, res) => {
  const userInfo = req.user._doc;
  UserModel.updateOne(
    { uid: userInfo.uid },
    { potho: req.body.face },
    (err, doc) => {
      if (err) {
        return res.cc(err);
      }

      if (doc.length !== 1) {
        return res.cc("fail");
      }
      res.cc("successful", 1);
    }
  );
};
