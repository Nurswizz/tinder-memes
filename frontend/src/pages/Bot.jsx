import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
// the page is called Bot.jsx and it is a chatbot page that gets the input from the user and generates a meme based on the input.
const Bot = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/bot",
        { input },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!auth.isAuthenticated) {
    navigate("/login");
  }

  // it should look like a chatbot page with a text input and a button to generate the meme.
  // The page should also have a navbar at the bottom with the title "Meme Generator Bot" and a form to input the meme idea.
  // use these colors: FF2E63, 969696, 000000, FFFFFF
  // The page should be responsive and look good on mobile devices.
  return (
    <div className="flex flex-col h-screen items-center justify-between ">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl text-[#FF2E63] font-bold mb-4">
          Meme Generator Bot
        </h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your meme idea..."
            className="border border-[#08D9D6] p-2 w-full placeholder-[#969696]"
          />
          <button
            className="bg-[#FF2E63] min-w-[150px] text-white font-bold py-2 rounded-md hover:bg-[#08D9D6] transition duration-300 ease-in-out cursor-pointer mt-2"
            onClick={handleSubmit}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Generate Meme"}
          </button>
        </form>
        {loading && <p>Loading...</p>}
        {response && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Generated Meme:</h2>
            <img src={response} alt="Generated Meme" className="mt-2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Bot;
