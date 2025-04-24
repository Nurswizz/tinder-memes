import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  return (
    <div className="flex flex-col items-center h-screen mt-10">
      <div className="flex flex-col items-center justify-center gap-10 ">
        <span className="text-2xl font-bold text-[#969696]">Tinder Memes</span>
        <span className="text-4xl font-bold text-[#FF2E63]">Register</span>
        <form className="flex flex-col gap-5 w-96 text-[#969696] max-w-[50vw] items-center">
          <input
            type="text"
            placeholder="Username"
            className="border border-[#08D9D6] rounded-md p-2 placeholder-[#969696]"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-[#08D9D6] rounded-md p-2 placeholder-[#969696] "
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-[#08D9D6] rounded-md p-2 placeholder-[#969696]"
          />
          <button className="bg-[#FF2E63] min-w-[150px] text-white font-bold py-2 rounded-md hover:bg-[#08D9D6] transition duration-300 ease-in-out cursor-pointer">
            Sign up
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

// color #969696
