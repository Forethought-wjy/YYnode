const CommentModel = require("../Model/CommentModel");
const ArticleModel = require("../Model/ArticleModel");
const GenId = require("../Utils/GenId");
const genId = new GenId({ WorkerId: 1 });

//Post comments
exports.repComment = (req, res) => {
  const userInfo = req.user._doc;
  const commentInfo = req.body;

  ArticleModel.find({ aid: commentInfo.aid }, (err, doc) => {
    if (err) {
      return res.cc(err);
    }
    if (doc.length == 0) {
      return res.cc("The article no longer exists");
    }
  });

  var comment = new CommentModel({
    cid: genId.NextId(),
    aid: commentInfo.aid,
    uid: userInfo.uid,
    c_content: commentInfo.c_content,
  });

  comment.save((err, doc) => {
    if (err) {
      return res.cc(err);
    }
    console.log("success Post");
    res.send(doc);
  });
};

//Yourself posted comments
exports.findSelfComment = (req, res) => {
  const userInfo = req.user._doc;
  CommentModel.find({ uid: userInfo.uid }, (err, doc) => {
    if (err) {
      return res.cc(err);
    }
    if (doc.length == 0) {
      return res.cc("No comments were made");
    }
    res.send(doc);
  });
};
