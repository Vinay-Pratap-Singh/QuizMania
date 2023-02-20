import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  AiOutlineDatabase,
  AiOutlineHome,
  AiOutlineUser,
} from "react-icons/ai";
import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md";
import { GrContact, GrOverview } from "react-icons/gr";
import { BsCaretDown } from "react-icons/bs";

const Sidebar = () => {
  // for toggling login and logout button
  const isLoggedIn = false;

  return (
    <div className="w-72 border-[1px] h-[100vh] border-r-gray-300 relative">
      {/* creating the header part of menu */}
      <header className="flex flex-col gap-2 items-center py-3 border-[1px] border-b-gray-300 border-t-transparent border-l-transparent border-r-transparent">
        <img className="w-24" src={logo} alt="logo image" />
        <h3 className="font-medium text-xl">Vinay Pratap Singh</h3>
      </header>

      {/* creating the body part of side bar */}
      <ul className="p-4 font-medium space-y-4">
        <li className="flex items-center gap-2">
          <AiOutlineHome className="text-xl" />
          <p>Home</p>
        </li>

        <li className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MdOutlineDashboard className="text-xl" />
              <p>Dashboard</p>
            </div>
            <BsCaretDown />
          </div>

          <ul className="pl-8 pt-2 space-y-2">
            <li className="flex items-center gap-2">
              <GrOverview className="text-lg" />
              <p>Overview</p>
            </li>

            <li className="flex items-center gap-2">
              <AiOutlineDatabase className="text-xl" />
              <p>Students</p>
            </li>

            <li className="flex items-center gap-2">
              <MdOutlineCategory className="text-xl" />
              <p>Category</p>
            </li>
          </ul>
        </li>

        <li className="flex items-center gap-2">
          <GrContact className="text-lg" />
          <p>Contact Us</p>
        </li>

        <li className="flex items-center gap-2">
          <AiOutlineUser className="text-xl" />
          <p>About Us</p>
        </li>
      </ul>

      {/* adding the login, signup and logout button */}
      <div className="absolute bottom-0 font-semibold w-full p-4">
        {isLoggedIn ? (
          <button className="w-full border-2 py-1 border-[#00C8AC] rounded-sm bg-[#00C8AC] text-white transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]">
            Logout
          </button>
        ) : (
          <div className="flex items-center justify-between gap-4 w-full">
            <Link
              className="w-1/2 border-2 py-1 text-center border-[#00C8AC] rounded-sm bg-[#00C8AC] text-white transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]"
              to={"/login"}
            >
              <button>Login</button>
            </Link>

            <Link
              className="w-1/2 border-2 py-1 text-center border-[#00C8AC] rounded-sm transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]"
              to={"/signup"}
            >
              <button>Signup</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
