const express = require('express');
const router = express.Router();
const memeController = require('../controllers/memeController');

router.get('/', memeController.getMeme); // Optional parameter for number of memes

module.exports = router;