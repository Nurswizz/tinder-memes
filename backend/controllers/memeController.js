const axios = require('axios');
const {db} = require('../config/db');
const usersCollection = db.collection('users');
const { ObjectId } = require('mongodb'); // Import this at the top

const getMeme = async (req, res) => {
    const url = `https://api.imgflip.com/get_memes`;
    const userId = req.user.id; 

    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const nextMemes = user.likedMemes + user.dislikedMemes;

    try {
        const response = await axios.get(url);
        const memes = response.data.data.memes.slice(nextMemes, nextMemes + 10).map(meme => ({
            id: meme.id,
            name: meme.name,
            url: meme.url,
            width: meme.width,
            height: meme.height
        }));
        return res.status(200).json(memes);
    } catch (error) {
        console.error('Error fetching memes:', error);
        return res.status(500).json({ message: 'Error fetching memes' });
    }
}


module.exports = {
    getMeme
}