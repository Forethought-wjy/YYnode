const ReplyModel = require("../Model/ReplyModel");
const CommentModel = require("../Model/CommentModel");
const GenId = require("../Utils/GenId");
const genId = new GenId({ WorkerId: 1 });

//Reply to comments
exports.toReply = (req, res) => {
  const userInfo = req.user._doc;
  const replyInfo = req.body;

  CommentModel.find({ cid: replyInfo.r_cid }, (err, doc) => {
    if (err) {
      return res.cc(err);
    }
    if (doc.length == 0) {
      return res.cc("The comment does not exist");
    }
  });

  var reply = ReplyModel({
    rid: genId.NextId(),
    uid: userInfo.uid,
    r_content: replyInfo.r_content,
    r_cid: replyInfo.r_cid,
    r_uid: replyInfo.r_uid,
  });

  reply.save((err, doc) => {
    if (err) {
      return res.cc(err);
    }
    console.log("success Post");
    res.send(doc);
  });
};

//Reply to all yourself comments
exports.toSelfReply = (req, res) => {
  const userInfo = req.user._doc;
  CommentModel.find({ r_uid: userInfo.uid }, (err, doc) => {
    if (err) {
      return res.cc(err);
    }
    if (doc.length == 0) {
      return res.cc("No one replied to you");
    }
    res.send(doc);
  });
};

//Get all responses based on comments
exports.getReplyById = (req, res) => {
  ReplyModel.find({ r_cid: parseFloat(req.params.r_cid) }, (err, doc) => {
    if (err) {
      return res.cc(err);
    }
    if (doc.length == 0) {
      return res.cc("No reply was received");
    }
    res.send(doc);
  });
};
