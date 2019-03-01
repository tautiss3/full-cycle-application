var express = require("express");
var router = express.Router();
var path = require("path");
var bodyParser = require("body-parser");
var chatController = require('../controllers/ChatController');

router.get("/", chatController.chatHome);
router.get("/:id", chatController.loadOne);
router.post("/:id", chatController.doReply);
router.get("/new/:id", chatController.loadNewConversation);
router.post("/new/:id", chatController.newConversation);

module.exports = router;