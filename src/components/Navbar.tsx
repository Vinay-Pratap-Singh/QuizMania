import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-[5%] h-[15vh]">
      {/* adding the logo */}
      <img className="w-20 rounded-full" src={logo} alt="logo image" />

      {/* adding the menu */}
      <ul className="flex items-center space-x-10 text-lg font-bold">
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;
