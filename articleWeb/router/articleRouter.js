const express = require("express");
const router = express.Router();
const articleHandler = require("../routerHandler/articleHandler");

//Publish articles
router.post("/article/publ", articleHandler.publArticle);

//Find articles by user name
router.get("/article/findBy/:name", articleHandler.findArticleByuname);

//Query yourself published articles
router.get("/article/findSelf", articleHandler.findSelf);

//Find comments based on articles
router.get("/article/comment/:aid", articleHandler.findCommentById);

//Comments on all articles
router.get("/article/comment/", articleHandler.findComments);

module.exports = router;
