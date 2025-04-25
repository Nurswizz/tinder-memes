const router = require('express').Router();

const userController = require('../controllers/userController');

const verifyUser = require("../middlewares/verifyUser");

router.post('/memes', verifyUser, userController.saveMemes); // Save multiple memes   
router.delete('/memes', verifyUser, userController.clearMemes); 

module.exports = router;