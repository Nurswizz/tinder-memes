import Navbar from "../components/Navbar";
import Meme from "../components/Meme";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Feed = () => {
    const [meme, setMeme] = useState(null);
    const [memesList, setMemesList] = useState([]);
    const [initialLoad, setInitialLoad] = useState(true);

    const fetchMemes = useCallback(async (number = 10) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/meme`, {
                params: { num: number },
            });
            const data = response.data;
            console.log("Fetched:", data.length);
            setMemesList(data);
            setMeme(data[0] || null);
        } catch (error) {
            console.error("Error fetching memes:", error);
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
        setMeme(updatedMemesList[0] || null);
        console.log("Liked meme");
    };

    const onDislike = () => {
        const updatedMemesList = memesList.slice(1);
        setMemesList(updatedMemesList);
        setMeme(updatedMemesList[0] || null);
        console.log("Disliked meme");
    };

    const onSave = () => {
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
