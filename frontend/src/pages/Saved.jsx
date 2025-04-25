import { useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios"
import useAuth from "../hooks/useAuth";
const Saved = () => {
    const [savedMemes, setSavedMemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = localStorage.getItem("user")
    const userAuth = useAuth();

    if (!userAuth.isAuthenticated ) {
        navigate("/login")
    }
    

    const fetchSavedMemes = async () => {
        try {
        const response = await axios(`${import.meta.env.VITE_BACKEND_URL}/user/memes/saved`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(user).token}`,
            },
        });
        console.log(response.status);
        const data = response.data
        console.log(data);
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
    const handleMemeClick = (meme) => {
        navigate("/meme", { state: { meme } });
    };
    const handleDelete = async (memeId) => {
        try {
            const response = await fetch(`/api/memes/saved/${memeId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (!response.ok) throw new Error("Failed to delete saved meme");
            setSavedMemes((prevMemes) => prevMemes.filter((meme) => meme.id !== memeId));
        } catch (error) {
            console.error(error);
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="saved-memes-container">
            <h1>Saved Memes</h1>
            {savedMemes.length === 0 ? (
                <p>No saved memes found.</p>
            ) : (
                <div className="meme-grid">
                    {savedMemes.map((meme) => (
                        <div key={meme.id} className="meme-card" onClick={() => handleMemeClick(meme)}>
                            <img src={meme.url} alt={meme.name} />
                            <button onClick={(e) => { e.stopPropagation(); handleDelete(meme.id); }}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
            <Navbar />
        </div>
    );
}

export default Saved;