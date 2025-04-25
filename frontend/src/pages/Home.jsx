import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white gap-4">
      <h1 className="text-[#FF2E63] font-bold text-5xl">MemeMatch</h1>
      <h2 className="text-[#969696] text-3xl mt-4">Welcome to MemeMatch!</h2>
      <p className="text-[#969696] text-lg mt-2">
        Your one-stop destination for meme sharing and discovery.
      </p>
      <p className="text-[#969696] text-lg mt-2">
        Join us and start sharing your favorite memes!
      </p>
      <button className="bg-[#FF2E63] min-w-[150px] text-white font-bold py-2 rounded-md hover:bg-[#08D9D6] transition duration-300 ease-in-out cursor-pointer" onClick={() => {navigateTo("/register")}}>
        Join now
      </button>
    </div>
  );
};

export default Home;
