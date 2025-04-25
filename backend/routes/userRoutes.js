const router = require('express').Router();

const userController = require('../controllers/userController');

const verifyUser = require("../middlewares/verifyUser");

router.post('/memes', verifyUser, userController.saveMemes);  
router.delete('/memes', verifyUser, userController.clearMemes); 
router.get('/memes', verifyUser, userController.getAllMemes);
router.get('/memes/saved', verifyUser, userController.getSavedMemes); 

module.exports = router;