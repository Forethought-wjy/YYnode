const mongoose = require("../db");
var CommentSchema = mongoose.Schema({
  cid: { type: Number, required: true, index: true },
  aid: { type: Number, required: true, index: true },
  uid: { type: Number, required: true, index: true },
  c_content: { type: String, required: true },
  c_time: { type: Date, default: Date.now() },
});

var CommentModel = mongoose.model("comment", CommentSchema, "comment");
module.exports = CommentModel;
