import { useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate(path);
    };

    if (auth.isAuthenticated) {
        navigateTo("/feed");
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = response.data;
            console.log("Login response:", data); // Debug

            if (response.status === 200) {
                if (data.token && typeof data.user === "object" && data.user !== null) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    navigateTo("/feed");
                } else {
                    console.warn("Invalid login data:", data);
                    setError("Invalid response from server. Please try again.");
                }
            } else {
                console.log(data.message);
                setError(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center h-screen mt-10">
            <div className="flex flex-col items-center justify-center gap-10">
                <span className="text-2xl font-bold text-[#969696]">MemeMatch</span>
                <span className="text-4xl font-bold text-[#FF2E63]">Login</span>
                <form className="flex flex-col gap-5 w-96 text-[#969696] max-w-[50vw] items-center">
                    <input
                        type="email"
                        placeholder="Email"
                        className="border border-[#08D9D6] rounded-md p-2 placeholder-[#969696]"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border border-[#08D9D6] rounded-md p-2 placeholder-[#969696]"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        className="bg-[#FF2E63] min-w-[150px] text-white font-bold py-2 rounded-md hover:bg-[#08D9D6] transition duration-300 ease-in-out cursor-pointer"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Sign In"}
                    </button>
                </form>
                <div className="text-[#969696] text-center">
                    <p>Do not have an account?</p>
                    <span
                        className="font-bold text-[#08D9D6] cursor-pointer"
                        onClick={() => {
                            navigateTo("/register");
                        }}
                    >
                        Register
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;