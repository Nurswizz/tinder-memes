const express = require('express');
const router = express.Router();
const memeController = require('../controllers/memeController');
const verifyUser = require("../middlewares/verifyUser");

router.get('/', verifyUser, memeController.getMeme); 

module.exports = router;