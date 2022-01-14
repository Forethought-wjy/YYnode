const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const config = require("./config/config");
const joi = require("joi");
const expressJWT = require("express-jwt");
const userRouter = require("./router/userRouter");
const articleRouter = require("./router/articleRouter");
const commentRouter = require("./router/commentRouter");
const replyRouter = require("./router/replyRouter");

app.use((req, res, next) => {
  res.cc = (err, status = 0) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

app.use(
  expressJWT({
    secret: config.secretKey,
    algorithms: config.algorithms,
  }).unless({
    path: config.path,
  })
);

app.use(userRouter);
app.use(articleRouter);
app.use(commentRouter);
app.use(replyRouter);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.cc("Invalid token", 401);
  }
  if (err instanceof joi.ValidationError) {
    res.cc(err);
  }
});

app.listen(config.port, () =>
  console.log(`Example app listening on port ${config.port}!`)
);
