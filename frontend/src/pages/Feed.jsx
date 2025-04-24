import Navbar from "../components/Navbar";
import Meme from "../components/Meme";
const Feed = () => {
    return (
        <div className="h-screen bg-[#121212] flex flex-col items-center min-w-[100vw] overflow-hidden">
            <div className="flex flex-col items-center mt-10">
                <div className="flex flex-col items-center justify-center gap-10 ">
                    <span className="text-2xl font-bold text-[#FF2E63]">MemeMatch</span>
                    <span className="text-4xl font-bold text-[#969696]">Feed</span>
                    <div className="flex flex-col gap-5 w-96 text-[#969696] max-w-[50vw] items-center">
                        {/* Feed content goes here */}
                        <Meme meme={{ name: "Meme 1", url: "https://placehold.jp/150x150.png", description: "This is a meme" }} />
                    </div>
                </div>
            </div>
            <Navbar />
        </div>
    )
}

export default Feed;