import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  if (localStorage.getItem("token")) {
    window.location.href = "/feed";
  }
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (user.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setLoading(true);
    setError(null);
    if (!user.username || !user.email || !user.password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      }
      );
      const data = response.data;
      if (response.ok) {
        navigateTo("/login");
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setError("User already exists.");
        return;
      }
      setError("An error occurred. Please try again later:" + error.message);
    } finally {
      setLoading(false);
    }
  }

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  return (
    <div className="flex flex-col items-center h-screen mt-10">
      <div className="flex flex-col items-center justify-center gap-10 ">
        <span className="text-2xl font-bold text-[#969696]">MemeMatch</span>
        <span className="text-4xl font-bold text-[#FF2E63]">Register</span>
        <form className="flex flex-col gap-5 w-96 text-[#969696] max-w-[50vw] items-center">
          <input
            type="text"
            placeholder="Username"
            className="border border-[#08D9D6] rounded-md p-2 placeholder-[#969696]"
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-[#08D9D6] rounded-md p-2 placeholder-[#969696] "
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-[#08D9D6] rounded-md p-2 placeholder-[#969696]"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button className="bg-[#FF2E63] min-w-[150px] text-white font-bold py-2 rounded-md hover:bg-[#08D9D6] transition duration-300 ease-in-out cursor-pointer" onClick={handleRegister} disabled={loading}>
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <div className="text-[#969696] text-center" >
          <p>Already have an account?</p>
          <span className="font-bold text-[#08D9D6] cursor-pointer" onClick={() => {navigateTo("/login")}}>Log in</span>
        </div>
      </div>
    </div>
  );
};

export default Register;

