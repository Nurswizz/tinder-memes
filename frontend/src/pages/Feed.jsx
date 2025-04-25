import Navbar from "../components/Navbar";
import Meme from "../components/Meme";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const [meme, setMeme] = useState(null);
  const [memesList, setMemesList] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);
  const [dislikedMemes, setDislikedMemes] = useState([]);
  const [savedMemes, setSavedMemes] = useState([]);

  const navigate = useNavigate();

  const saveUserMemes = async () => {
    if (likedMemes.length === 0 && dislikedMemes.length === 0 && savedMemes.length === 0) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/memes`,
        { likedMemes, dislikedMemes, savedMemes },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("User meme actions saved to DB");

      setLikedMemes([]);
      setDislikedMemes([]);
      setSavedMemes([]);
    } catch (error) {
      console.error("Failed to save memes:", error);
    }
  };

  const fetchMemes = useCallback(async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/meme`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = response.data || [];
      setMemesList(data);
      setMeme(data[0] || null);

      await Promise.all(
        data.map((meme) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = meme.url;
            img.onload = resolve;
          });
        })
      );
      console.log("All meme images preloaded");
    } catch (error) {
      console.error("Error fetching memes:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchMemes();
  }, [fetchMemes]);

  const handleNextMeme = async (actionType) => {
    const updatedMemesList = memesList.slice(1);
    setMemesList(updatedMemesList);
    setMeme(updatedMemesList[0] || null);

    if (actionType === "like") setLikedMemes((prev) => [...prev, meme]);
    if (actionType === "dislike") setDislikedMemes((prev) => [...prev, meme]);

    if (updatedMemesList.length === 0) {
      await saveUserMemes();
      await fetchMemes();
    }
  };

  const onLike = () => handleNextMeme("like");
  const onDislike = () => handleNextMeme("dislike");
  const onSave = () => {
    setSavedMemes((prev) => [...prev, meme]);
    console.log("Saved meme");
  };
  return (
    <div className="h-screen bg-[#121212] flex flex-col items-center min-w-[100vw] overflow-hidden">
      <div className="flex flex-col items-center mt-10">
        <div className="flex flex-col items-center justify-center gap-10">
          <span className="text-2xl font-bold text-[#FF2E63]">MemeMatch</span>
          <span className="text-4xl font-bold text-[#969696]">Feed</span>
          <div className="flex flex-col gap-5 w-96 text-[#969696] max-w-[50vw] items-center">
            {meme ? (
              <Meme
                meme={meme}
                onDislike={onDislike}
                onLike={onLike}
                onSave={onSave}
              />
            ) : (
              <div className="text-[#969696] text-center">
                No more memes available
              </div>
            )}
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Feed;
