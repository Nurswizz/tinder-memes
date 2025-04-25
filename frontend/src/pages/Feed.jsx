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

    const [initialLoad, setInitialLoad] = useState(true);
    const navigate = useNavigate();

    const fetchMemes = useCallback(async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/meme`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = response.data;
            setMemesList(data);
            setMeme(data[0] || null);

            
        } catch (error) {
            console.error("Error fetching memes:", error);
            if (error.response && error.response.status === 401) {
                console.error("Unauthorized access. Please log in again.");
                // Handle unauthorized access (e.g., redirect to login page)
                localStorage.removeItem("token");
                navigate("/login", { replace: true });
            }
        }
    }, []);

    useEffect(() => {
        fetchMemes(10);
        setInitialLoad(false);
    }, [fetchMemes]);

    useEffect(() => {
        if (!initialLoad && memesList.length === 0) {
            fetchMemes(10);
        }
    }, [memesList, initialLoad, fetchMemes]);

    const onLike = () => {
        const updatedMemesList = memesList.slice(1);
        setMemesList(updatedMemesList);
        setLikedMemes((prev) => [...prev, meme]);
        setMeme(updatedMemesList[0] || null);
        console.log("Liked meme");
    };

    const onDislike = () => {
        const updatedMemesList = memesList.slice(1);
        setMemesList(updatedMemesList);
        setDislikedMemes((prev) => [...prev, meme]);
        setMeme(updatedMemesList[0] || null);
        console.log("Disliked meme");
    };

    const onSave = () => {
        setSavedMemes((prev) => [...prev, meme]);
        console.log("Saved meme");
    };
    return (
        <div className="h-screen bg-[#121212] flex flex-col items-center min-w-[100vw] overflow-hidden">
            <div className="flex flex-col items-center mt-10">
                <div className="flex flex-col items-center justify-center gap-10 ">
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
