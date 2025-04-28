import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { X } from "lucide-react";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Backdrop from "@mui/material/Backdrop";

const Saved = () => {
  const [savedMemes, setSavedMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userAuth = useAuth();

  const handleClose = () => {
    setSelectedMeme(null);
  };

  const handleOpen = (meme) => {
    setSelectedMeme(meme);
  };

  if (!userAuth.isAuthenticated) {
    navigate("/login");
  }

  const fetchSavedMemes = async () => {
    try {
      setLoading(true);
      const response = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/user/memes/saved`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      setSavedMemes(data.savedMemes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedMemes();
  }, []);

  const handleDelete = async (memeUrl) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/memes/saved/${memeUrl}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete saved meme");
      setSavedMemes((prevMemes) =>
        prevMemes.filter((meme) => meme.url !== memeUrl)
      );
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-20">
      <Navbar />
      <h1 className="text-3xl text-[#FF2E63] font-bold mb-4">Saved Memes</h1>

      {showAlert && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          onClose={() => setShowAlert(false)}
          severity="success"
          sx={{
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 9999,
          }}
        >
          Meme unsaved successfully!
        </Alert>
      )}

      {loading ? (
        <h1 className="text-3xl text-[#FFFFFF]">Loading...</h1>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center mt-10">
          {savedMemes.length === 0 ? (
            <h1 className="text-3xl text-[#FFFFFF] text-center">
              No saved memes
            </h1>
          ) : (
            savedMemes.map((meme) => (
              <div
                key={meme.url}
                className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer relative"
                onClick={() => handleOpen(meme)}
              >
                <X
                  color="red"
                  size={48}
                  className="absolute"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent opening backdrop when clicking delete
                    handleDelete(meme.id);
                  }}
                />
                <img
                  src={meme.url}
                  alt={meme.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))
          )}
        </div>
      )}

      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
          backdropFilter: "blur(5px)", // smooth effect
        })}
        open={Boolean(selectedMeme)}
        onClick={handleClose}
      >
        {selectedMeme && (
          <img
            src={selectedMeme.url}
            alt={selectedMeme.title}
            className="max-h-[80vh] max-w-[90vw] rounded-lg"
          />
        )}
      </Backdrop>
    </div>
  );
};

export default Saved;
