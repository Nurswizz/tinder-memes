import Navbar from "../components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  if (!auth.isAuthenticated) {
    navigate("/login");
  }
  const user = JSON.parse(localStorage.getItem("user"));
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/memes`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = response.data;
        setMemes(data);
      } catch (error) {
        console.error(error);
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }

      } finally {
        setLoading(false);
      }
    };
    fetchMemes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div className="flex flex-col items-center pt-10 h-screen text-white">
      <Navbar />
      <div className="bg-[#0e0e0f] rounded-2xl border-[1px] border-[#08D9D6] min-h-[80vh] p-4 shadow-lg w-full max-w-[400px] mt-10">
        <h1 className="text-4xl font-bold text-[#FF2E63] text-center">
          Profile
        </h1>
        <div className="flex flex-col items-center mt-10">
          <img src="https://static-00.iconduck.com/assets.00/user-icon-2046x2048-9pwm22pp.png" width={100} alt="Profile" className="rounded-full mb-4" />
          <h2 className="text-2xl font-semibold text-[#969696]">
            {user.username}
          </h2>
          {loading ? (
            <p className="text-[#08D9D6]">Loading...</p>
          ) : (
            <div className="w-full mt-10 flex flex-col items-center">
              <h1 className="text-3xl">Statistics</h1>
              <div className="flex gap-4 mt-4 flex-wrap justify-center"> 
                <div className="bg-[#0e0e0f] rounded-lg p-4 border-[1px] border-[#08D9D6] shadow-md max-w-[150px]">
                  <h3 className="text-lg font-semibold text-[#FF2E63]">
                    Saved Memes
                  </h3>
                  <p className="text-[#969696]">{memes.savedMemes?.length}</p>
                </div>
                <div className="bg-[#0e0e0f] rounded-lg p-4 border-[1px] border-[#08D9D6] shadow-md max-w-[150px]">
                  <h3 className="text-lg font-semibold text-[#FF2E63]">
                    Liked Memes
                  </h3>
                  <p className="text-[#969696]">{memes.likedMemes?.length}</p>
                </div>
                <div className="bg-[#0e0e0f] rounded-lg p-4 border-[1px] border-[#08D9D6] shadow-md max-w-[150px]">
                  <h3 className="text-lg font-semibold text-[#FF2E63]">
                    Disliked Memes
                  </h3>
                  <p className="text-[#969696]">{memes.dislikedMemes?.length}</p>
                </div>
                <div className="bg-[#0e0e0f] rounded-lg p-4 border-[1px] border-[#08D9D6] shadow-md max-w-[150px]">
                  <h3 className="text-lg font-semibold text-[#FF2E63]">
                    Total Swipes
                  </h3>
                  <p className="text-[#969696]">{memes.dislikedMemes?.length + memes.likedMemes?.length}</p>
                </div>
              </div>
              
            </div>
          )}
        </div>
        <div className="flex flex-col items-center mt-5">
          <button className="bg-[#FF2E63] cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-[#08D9D6] transition duration-300 ease-in-out" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
