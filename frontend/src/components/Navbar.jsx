import { Link } from "react-router";

const Navbar = () => {
  return <nav className="bg-[#121212] fixed bottom-0 w-full flex justify-center py-4 shadow-lg">
    <ul>
      <li className="text-white flex justify-around w-full max-w-[400px] gap-15">
        <Link to={{
          pathname: "/feed",
          state: { fromFeed: true } 
        }}>Feed</Link>
        <Link to={{
          pathname: "/saved",
          state: { fromFeed: true }
        }}>Saved Memes</Link>
        <Link to={{
          pathname: "/profile",
          state: { fromFeed: true }
        }}>Profile</Link>
      </li>
    </ul>
  </nav>;
};

export default Navbar;
