const mongoose = require("../db");
var ArticleSchema = mongoose.Schema({
  aid: { type: Number, required: true, index: true },
  uid: { type: Number, required: true, index: true },
  username: { type: String, required: true, maxlength: 10, minlength: 1 },
  a_title: { type: String, required: true, trim: true },
  a_content: String,
  a_time: { type: Date, default: Date.now() },
});

var ArticleModel = mongoose.model("article", ArticleSchema, "article");
module.exports = ArticleModel;
