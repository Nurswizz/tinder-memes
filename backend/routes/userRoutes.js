const router = require('express').Router();

const userController = require('../controllers/userController');

const verifyUser = require("../middlewares/verifyUser");

router.post('/like/:id', verifyUser, userController.likeMeme); // Like a meme
router.post('/unlike/:id', verifyUser, userController.unlikeMeme); // Unlike a meme
router.post('/dislike/:id', verifyUser, userController.dislikeMeme); // Dislike a meme
router.post('/undislike/:id', verifyUser, userController.undislikeMeme); // Undislike a meme
router.post('/save/:id', verifyUser, userController.saveMeme); // Save a meme
router.post('/unsave/:id', verifyUser, userController.unsaveMeme); // Unsave a meme

module.exports = router;