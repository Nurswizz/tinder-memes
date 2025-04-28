// http://localhost:3000/api/user/suggestions
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import { Backdrop } from "@mui/material";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userAuth = useAuth();
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [open, setOpen] = useState(false);

  if (!userAuth.isAuthenticated) {
    navigate("/login");
  }

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/suggestions`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      if (data.notEnough) {
        setError("Not enough data for suggestions. You should have at least 10 memes to get suggestions.");
        return;
      }
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch suggestions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  // a list of suggestions that are not memes, but rather users, the user can click on them to check their stats by backdrop component
  const handleOpen = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedSuggestion(null);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center pt-10 h-screen text-white">
      <Navbar />
      <div className="bg-[#0e0e0f] rounded-2xl border-[1px] border-[#08D9D6] min-h-[80vh] p-4 shadow-lg w-full max-w-[400px] mt-10">
        <h1 className="text-4xl font-bold text-[#FF2E63] text-center">
          Suggestions
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="flex flex-col items-center mt-10">
            {suggestions.map((suggestion) => (
              // suggestion is a user, not a meme
              // when clicked, it opens a backdrop with the user stats
              // suggestion has an id, username, likedMemesCount, dislikedMemesCount, savedMemesCount
              // suggestion is an object with the following properties: id, username, likedMemesCount, dislikedMemesCount, savedMemesCount
              // memesCount should be showed in the backdrop
              // likedMemesCount, dislikedMemesCount, savedMemesCount should be showed in the backdrop
              <div
                key={suggestion.id}
                className="bg-[#121212] rounded-lg p-4 mb-4 w-full cursor-pointer hover:bg-[#08D9D6] transition duration-300"
                onClick={() => handleOpen(suggestion)}
              >
                <h2 className="text-xl font-semibold text-[#FF2E63]">
                  {suggestion.username}
                </h2>
              </div>
            ))}
          </div>
        )}
      </div>
      <Backdrop open={open} onClick={handleClose}>
        {selectedSuggestion && (
          <div className="bg-[#121212] rounded-lg p-4 w-96 text-center">
            <h2>{selectedSuggestion.username}</h2>
            <p className="text-[#969696]">
              Liked Memes: {selectedSuggestion.likedMemesCount}
            </p>
            <p className="text-[#969696]">
              Disliked Memes: {selectedSuggestion.dislikedMemesCount}
            </p>
            <p className="text-[#969696]">
              Saved Memes: {selectedSuggestion.savedMemesCount}
            </p>
          </div>
        )}
      </Backdrop>
    </div>
  );
};

export default Suggestions;
