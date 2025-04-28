import { Link } from "react-router";
import { Book, Bookmark, Bot } from "lucide-react";
import { Home } from "lucide-react";
import { User2 } from "lucide-react";
const Navbar = () => {
  return (
    <nav className="bg-[#0e0e0f] rounded-2xl border-[1px] mb-2 border-[#08D9D6] fixed bottom-0 px-3 flex justify-center px-10 py-4 shadow-lg">
      <ul>
        <li className="text-white flex justify-around w-full max-w-[400px] gap-15">
          <Link
            to={{
              pathname: "/feed",
              state: { fromFeed: true },
            }}
          >
            <Home />
          </Link>
          <Link
            to={{
              pathname: "/saved",
              state: { fromFeed: true },
            }}
          >
            <Bookmark />{" "}
          </Link>
          <Link
            to={{
              pathname: "/profile",
              state: { fromFeed: true },
            }}
          >
            {" "}
            <User2 />
          </Link>
          <Link
            to={{
              pathname: "/suggestions",
              state: { fromFeed: true },
            }}
          >
            <Book />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
