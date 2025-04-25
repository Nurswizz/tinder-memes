const { db } = require("../config/db");
const userCollection = db.collection("users");

const likeMeme = async (req, res) => {
  const { likedMemes } = req.body;
  const userId = req.user.id;

  try {
    const user = await userCollection.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const likedMemes = user.likedMemes || [];
    if (likedMemes.includes(memeId)) {
      return res.status(400).json({ message: "Meme already liked" });
    }
    likedMemes.push(memeId);
    await userCollection.updateOne({ _id: userId }, { $set: { likedMemes } });

    return res.status(200).json({ message: "Meme liked successfully" });
  } catch (error) {
    console.error("Error liking meme:", error);
    return res.status(500).json({ message: "Error liking meme" });
  }
};

const unlikeMeme = async (req, res) => {
  const { memeId } = req.body;
  const userId = req.user.id;

  try {
    const user = await userCollection.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const likedMemes = user.likedMemes || [];
    if (!likedMemes.includes(memeId)) {
      return res.status(400).json({ message: "Meme not liked yet" });
    }
    const updatedLikedMemes = likedMemes.filter((id) => id !== memeId);
    await userCollection.updateOne(
      { _id: userId },
      { $set: { likedMemes: updatedLikedMemes } }
    );

    return res.status(200).json({ message: "Meme unliked successfully" });
  } catch (error) {
    console.error("Error unliking meme:", error);
    return res.status(500).json({ message: "Error unliking meme" });
  }
};

const dislikeMeme = async (req, res) => {
  const { memeId } = req.body;
  const userId = req.user.id;

  try {
    const user = await userCollection.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const dislikedMemes = user.dislikedMemes || [];
    if (dislikedMemes.includes(memeId)) {
      return res.status(400).json({ message: "Meme already disliked" });
    }
    dislikedMemes.push(memeId);
    await userCollection.updateOne(
      { _id: userId },
      { $set: { dislikedMemes } }
    );

    return res.status(200).json({ message: "Meme disliked successfully" });
  } catch (error) {
    console.error("Error disliking meme:", error);
    return res.status(500).json({ message: "Error disliking meme" });
  }
};

const undislikeMeme = async (req, res) => {
  const { memeId } = req.body;
  const userId = req.user.id; // Assuming you have user authentication middleware that sets req.user

  try {
    const user = await userCollection.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const dislikedMemes = user.dislikedMemes || [];
    if (!dislikedMemes.includes(memeId)) {
      return res.status(400).json({ message: "Meme not disliked yet" });
    }
    const updatedDislikedMemes = dislikedMemes.filter((id) => id !== memeId);
    await userCollection.updateOne(
      { _id: userId },
      { $set: { dislikedMemes: updatedDislikedMemes } }
    );

    return res.status(200).json({ message: "Meme undisliked successfully" });
  } catch (error) {
    console.error("Error undisliking meme:", error);
    return res.status(500).json({ message: "Error undisliking meme" });
  }
};

const saveMeme = async (req, res) => {
  const { memeId } = req.body;
  const userId = req.user.id; // Assuming you have user authentication middleware that sets req.user

  try {
    const user = await userCollection.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const savedMemes = user.savedMemes || [];
    if (savedMemes.includes(memeId)) {
      return res.status(400).json({ message: "Meme already saved" });
    }
    savedMemes.push(memeId);
    await userCollection.updateOne({ _id: userId }, { $set: { savedMemes } });

    return res.status(200).json({ message: "Meme saved successfully" });
  } catch (error) {
    console.error("Error saving meme:", error);
    return res.status(500).json({ message: "Error saving meme" });
  }
};

const unsaveMeme = async (req, res) => {
  const { memeId } = req.body;
  const userId = req.user.id; // Assuming you have user authentication middleware that sets req.user

  try {
    const user = await userCollection.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const savedMemes = user.savedMemes || [];
    if (!savedMemes.includes(memeId)) {
      return res.status(400).json({ message: "Meme not saved yet" });
    }
    const updatedSavedMemes = savedMemes.filter((id) => id !== memeId);
    await userCollection.updateOne(
      { _id: userId },
      { $set: { savedMemes: updatedSavedMemes } }
    );

    return res.status(200).json({ message: "Meme unsaved successfully" });
  } catch (error) {
    console.error("Error unsaving meme:", error);
    return res.status(500).json({ message: "Error unsaving meme" });
  }
};

module.exports = {
  likeMeme,
  unlikeMeme,
  dislikeMeme,
  undislikeMeme,
  saveMeme,
  unsaveMeme,
};
