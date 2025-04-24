import Navbar from "../components/Navbar";
import Meme from "../components/Meme";
import { useState } from "react";
const Feed = () => {
    const memes = [
        { id: 1, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSoMQEq18766KhZXi04TYnWP2uL7ohRGQcaA&s", caption: "Meme 1" },
        { id: 2, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ZFn7CJb61qOIGce_gkAUyTSbZdnEY8SB1g&s", caption: "Meme 2" },
        { id: 3, url: "https://preview.redd.it/i-have-no-experience-because-i-cant-get-a-job-cant-get-a-v0-lomk5b4t38fe1.jpeg?auto=webp&s=06a06ac441f79d573a3402d5e1605c7fe28b296f", caption: "Meme 3" },
    ];

    const [meme, setMeme] = useState(memes[0]);
    const [memesList, setMemesList] = useState(memes);
    
    const onLike = () => {
        const updatedMemesList = memesList.slice(1);
        setMemesList(updatedMemesList);
        setMeme(updatedMemesList[0] || null);
        console.log("Liked meme");
        console.log(updatedMemesList); 
    }
    const onDislike = () => {
        const updatedMemesList = memesList.slice(1);
        setMemesList(updatedMemesList);
        setMeme(updatedMemesList[0] || null);
        console.log("Disliked meme");
    }
    const onSave = () => {
        console.log("Saved meme");
    }

    return (
        <div className="h-screen bg-[#121212] flex flex-col items-center min-w-[100vw] overflow-hidden">
            <div className="flex flex-col items-center mt-10">
                <div className="flex flex-col items-center justify-center gap-10 ">
                    <span className="text-2xl font-bold text-[#FF2E63]">MemeMatch</span>
                    <span className="text-4xl font-bold text-[#969696]">Feed</span>
                    <div className="flex flex-col gap-5 w-96 text-[#969696] max-w-[50vw] items-center">
                        {/* Feed content goes here */}
                        { meme && memesList.length > 0 ?
                            <Meme meme={meme} onDislike={onDislike} onLike={onLike} onSave={onSave} /> :
                            <div className="text-[#969696] text-center">No more memes available</div>
                        }

                    </div>
                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default Feed;