var express = require("express");
var router = express.Router();
var path = require("path");
var bodyParser = require("body-parser");
const Workoutevent = require("../models/Workoutevent");
var calController = require("../controllers/CalendarController");

router.get("/", calController.calendarHome);
router.get("/data", calController.loadEvents);
router.post("/data", calController.doEvent);

module.exports = router;
