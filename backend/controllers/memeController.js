const axios = require('axios');
const {db} = require('../config/db');
const usersCollection = db.collection('users');
const { ObjectId } = require('mongodb'); 

const getMeme = async (req, res) => {
    const url = "https://api.imgflip.com/get_memes";
    const userId = req.user?.id;
  
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: missing user ID" });
    }
  
    try {
      const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const viewedIds = new Set([
        ...(user.likedMemes || []),
        ...(user.dislikedMemes || []),
      ].map(meme => typeof meme === "string" ? meme : meme.id));
  
      const response = await axios.get(url);
      const allMemes = response.data?.data?.memes || [];
  
      const unseenMemes = allMemes
        .filter(meme => !viewedIds.has(meme.id))
        .slice(0, 10) 
        .map((meme) => ({
          id: meme.id,
          name: meme.name,
          url: meme.url,
          width: meme.width,
          height: meme.height,
        }));
  
      if (unseenMemes.length === 0) {
        return res.status(200).json({ message: "No new memes available" });
      }
  
      return res.status(200).json(unseenMemes);
    } catch (error) {
      console.error("Error fetching memes:", error.message || error);
      return res.status(500).json({ message: "Internal server error while fetching memes" });
    }
  };


module.exports = {
    getMeme
}