const express = require("express");
const router = express.Router();
const commentHandler = require("../routerHandler/commentHandler");

//Post comments
router.post("/comment/rep", commentHandler.repComment);

//Yourself posted comments
router.get("/comment/findSelf",commentHandler.findSelfComment)

module.exports = router;
