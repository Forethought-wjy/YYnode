const mongoose = require("../db");
var ReplySchema = mongoose.Schema({
  rid: { type: Number, required: true, index: true },
  uid: { type: Number, required: true, index: true },
  r_content: { type: String, required: true },
  r_cid: { type: Number, required: true, index: true },
  r_uid: { type: Number, required: true, index: true },
  r_time: { type: Date, default: Date.now() },
});

var ReplyModel = mongoose.model("reply", ReplySchema, "reply");
module.exports = ReplyModel;
