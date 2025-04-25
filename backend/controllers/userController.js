const { db } = require("../config/db");
const userCollection = db.collection("users");
const { ObjectId } = require("mongodb");
const { get } = require("../routes/userRoutes");

const unlikeMeme = async (req, res) => {
  const { memeId } = req.body;
  const userId = req.user.id;

  try {
    //TODO

    return res.status(200).json({ message: "Meme unliked successfully" });
  } catch (error) {
    console.error("Error unliking meme:", error);
    return res.status(500).json({ message: "Error unliking meme" });
  }
};


const undislikeMeme = async (req, res) => {
  const { memeId } = req.body;
  const userId = req.user.id;

  try {
    //TODO
    return res.status(200).json({ message: "Meme undisliked successfully" });
  } catch (error) {
    console.error("Error undisliking meme:", error);
    return res.status(500).json({ message: "Error undisliking meme" });
  }
};


const unsaveMeme = async (req, res) => {
  const { memeId } = req.body;
  const userId = req.user.id;

  try {
    //TODO

    return res.status(200).json({ message: "Meme unsaved successfully" });
  } catch (error) {
    console.error("Error unsaving meme:", error);
    return res.status(500).json({ message: "Error unsaving meme" });
  }
};

const saveMemes = async (req, res) => {
  const { savedMemes = [], likedMemes = [], dislikedMemes = [] } = req.body;

  if (!Array.isArray(savedMemes) || !Array.isArray(likedMemes) || !Array.isArray(dislikedMemes)) {
    return res.status(400).json({ message: "Invalid request data: all meme fields must be arrays." });
  }

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: user ID missing." });
  }

  console.log("Saving memes for user:", userId);

  try {
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const mergeUnique = (oldList, newList) => [...new Set([...(oldList || []), ...newList])];

    const updatedSavedMemes = mergeUnique(user.savedMemes, savedMemes);
    const updatedLikedMemes = mergeUnique(user.likedMemes, likedMemes);
    const updatedDislikedMemes = mergeUnique(user.dislikedMemes, dislikedMemes);

    const result = await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          savedMemes: updatedSavedMemes,
          likedMemes: updatedLikedMemes,
          dislikedMemes: updatedDislikedMemes,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(304).json({ message: "No changes made to the user's memes." });
    }

    console.log("Memes updated successfully for user:", userId);
    return res.status(200).json({ message: "Memes saved successfully" });
  } catch (error) {
    console.error("Error saving memes:", error);
    return res.status(500).json({ message: "Internal server error while saving memes" });
  }
};

const clearMemes = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: user ID missing." });
  }

  try {
    const result = await userCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          savedMemes: [],
          likedMemes: [],
          dislikedMemes: [],
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(304).json({ message: "No changes made to the user's memes." });
    }

    console.log("All memes cleared successfully for user:", userId);
    return res.status(200).json({ message: "All memes cleared successfully" });
  } catch (error) {
    console.error("Error clearing memes:", error);
    return res.status(500).json({ message: "Internal server error while clearing memes" });
  }
};

const getSavedMemes = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: user ID missing." });
  }

  try {
    console.log(userId);
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const savedMemes = user.savedMemes || [];

    return res.status(200).json({ savedMemes });
  } catch (error) {
    console.error("Error fetching saved memes:", error);
    return res.status(500).json({ message: "Internal server error while fetching saved memes" });
  }
}

const getAllMemes = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: user ID missing." });
  }

  try {
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const allMemes = {
      savedMemes: user.savedMemes || [],
      likedMemes: user.likedMemes || [],
      dislikedMemes: user.dislikedMemes || [],
    };

    return res.status(200).json(allMemes);
  } catch (error) {
    console.error("Error fetching all memes:", error);
    return res.status(500).json({ message: "Internal server error while fetching all memes" });
  }
};

module.exports = {
  saveMemes,
  unlikeMeme,
  undislikeMeme,
  unsaveMeme,
  clearMemes,
  getSavedMemes,
  getAllMemes,
};
