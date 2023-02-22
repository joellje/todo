var express = require("express");
var router = express.Router(); // route level middle-ware (index)
const indexController = require("../controllers/indexController");
require("dotenv").config();

router.route("/").get(indexController.getLandingPage);

module.exports = router;
