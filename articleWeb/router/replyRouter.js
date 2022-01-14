const express = require("express");
const router = express.Router();
const replyHandler = require("../routerHandler/replyHandler");

//Reply to comments
router.post("/reply/torep", replyHandler.toReply);

//get Reply to all yourself comments
router.get("/reply/toSelfReply", replyHandler.toSelfReply);

//Get all reply based on comments
router.get("/reply/getReply/:r_cid",replyHandler.getReplyById)

module.exports = router;
