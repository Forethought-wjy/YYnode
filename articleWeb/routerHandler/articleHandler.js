const ArticleModel = require("../Model/ArticleModel");
const CommentModel = require("../Model/CommentModel");
const GenId = require("../Utils/GenId");
const genId = new GenId({ WorkerId: 1 });

//Publish articles
exports.publArticle = (req, res) => {
  const userInfo = req.user._doc;
  const articleInfo = req.body;

  ArticleModel.find({ a_title: articleInfo.a_title }, (err, doc) => {
    if (err) {
      return res.cc(err);
    }
    if (doc.length !== 0) {
      return res.cc("Topic repetition");
    }
  });

  var article = new ArticleModel({
    aid: genId.NextId(),
    uid: userInfo.uid,
    username: userInfo.username,
    a_title: articleInfo.a_title,
    a_content: articleInfo.a_content,
  });

  article.save((err, doc) => {
    if (err) {
      return res.cc(err);
    }
    console.log("success Publish");
    res.send(doc);
  });
};

//Find articles by user name
exports.findArticleByuname = (req, res) => {
  ArticleModel.find({ username: req.params.name }, (err, doc) => {
    if (err) {
      return res.cc(err);
    }
    res.send(doc);
  });
};

//Find articles by name
exports.findArticleByaname = (req, res) => {
  ArticleModel.find({ a_title: req.params.name }, (err, doc) => {
    if (err) {
      return res.cc(err);
    }
    res.send(doc);
  });
};

//Query yourself published articles
exports.findSelf = (req, res) => {
  const userInfo = req.user._doc;
  ArticleModel.find({ uid: userInfo.uid }, (err, doc) => {
    if (err) {
      return res.cc(err);
    }
    if (doc.length == 0) {
      return res.cc("Publish your article, genius");
    }
    res.send(doc);
  });
};

//Find comments based on articles
exports.findCommentById =  (req, res) => {
  var articleInfo = req.params;
  ArticleModel.find({ aid: articleInfo.aid }, (err, doc) => {
    if (err) {
      return res.cc(err);
    }
    if (doc.length == 0) {
      return res.cc("Article does not exist");
    }
  });

  ArticleModel.aggregate(
    [
      { $match: { aid: parseFloat(articleInfo.aid) } },
      {
        $lookup: {
          from: "comment",
          localField: "aid",
          foreignField: "aid",
          as: "a_comment",
        },
      },
    ],
    (err, doc) => {
      if (err) {
        return res.cc(err);
      }
      res.send(doc);
    }
  );
};

//Comments on all articles
exports.findComments =(req,res)=>{
    ArticleModel.aggregate(
        [
          {
            $lookup: {
              from: "comment",
              localField: "aid",
              foreignField: "aid",
              as: "a_comment",
            }
          }
        ],
        (err, doc) => {
          if (err) {
            return res.cc(err);
          }
          res.send(doc);
        }
      );
}