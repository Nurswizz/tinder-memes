const axios = require('axios');
const db = require('../config/db'); 

const getMeme = async (req, res) => {
    const num = req.query.num || 1; 
    if (isNaN(num) || num <= 0) {
        return res.status(400).json({ message: 'Invalid number of memes requested' });
    }
    const url = `https://meme-api.com/gimme/${num}`;
    try {
        const response = await axios.get(url);
        const memes = response.data.memes;
        return res.status(200).json(memes);
    } catch (error) {
        console.error('Error fetching memes:', error);
        return es.status(500).json({ message: 'Error fetching memes' });
    }
}

module.exports = {
    getMeme,
}