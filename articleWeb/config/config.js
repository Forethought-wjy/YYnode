module.exports = {
  port: 3000,

  //about jwt
  secretKey: "wjy",
  algorithms: ["HS256"],
  path: [/^\/api\//],
  expiresIn: { expiresIn: "5h" },
};
