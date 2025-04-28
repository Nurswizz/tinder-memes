const axios = require("axios");
const { db } = require("../config/db");
const usersCollection = db.collection("users");
const { ObjectId } = require("mongodb");

const getMeme = async (req, res) => {
  let num = parseInt(req.query.num, 10) || 10; 
  if (isNaN(num) || num <= 0) {
    return res
      .status(400)
      .json({ message: "Invalid number of memes requested" });
  }

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: missing user ID" });
  }

  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const likedMemes = user.likedMemes || [];
    const dislikedMemes = user.dislikedMemes || [];

    const url = `https://meme-api.com/gimme/${num}`;
    const response = await axios.get(url);
    const memes = response.data.memes || [];

    // Compare by meme URL or postLink (since there's no 'id')
    const seenMemesLinks = [
      ...likedMemes.map((meme) => meme.postLink || meme.url),
      ...dislikedMemes.map((meme) => meme.postLink || meme.url),
    ];

    const filteredMemes = memes.filter((meme) => {
      return (
        !seenMemesLinks.includes(meme.postLink) &&
        !seenMemesLinks.includes(meme.url)
      );
    });
    const memesToSend = filteredMemes.map((meme) => {
      return {
        title: meme.title,
        id: meme.postLink.slice(meme.postLink.lastIndexOf("/") + 1),
        url: meme.url,
      };
    });
    if (filteredMemes.length === 0) {
      getMeme(req, res); 
      return;
    }

    return res.status(200).json(memesToSend);
  } catch (error) {
    console.error("Error fetching memes:", error.message || error);
    return res
      .status(500)
      .json({ message: "Internal server error while fetching memes" });
  }
};

const generateMeme = async (req, res) => {
  // TODO: Implement the logic to generate a meme based on user input

  
};

module.exports = {
  getMeme,
}
