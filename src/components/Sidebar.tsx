import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  AiOutlineDatabase,
  AiOutlineHome,
  AiOutlineUser,
} from "react-icons/ai";
import { MdOutlineCategory, MdOutlineDashboard } from "react-icons/md";
import { GrContact, GrOverview } from "react-icons/gr";
import { BsCaretDown, BsCaretUp, BsQuestion } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { logout } from "../redux/AuthSlice";
import { ADMIN_ROLE } from "../config/config";

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();

  // for toggling login and logout button
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );
  const userRole = useSelector((state: RootState) => state.auth.role);
  const userName = useSelector((state: RootState) => state.auth.name);
  // for getting drop down menu
  const [dropDownMenu, setDropDownMenu] = useState<boolean>(false);

  return (
    <div className="w-60 border-[1px] h-[100vh] border-r-gray-300 fixed left-0 z-50">
      {/* creating the header part of menu */}
      <header className="flex flex-col gap-2 items-center py-3 border-[1px] border-b-gray-300 border-t-transparent border-l-transparent border-r-transparent">
        <img className="w-24" src={logo} alt="logo image" />
        {isLoggedIn ? (
          <h3 className="font-medium text-xl">{userName}</h3>
        ) : (
          <p></p>
        )}
      </header>

      {/* creating the body part of side bar */}
      <ul className="p-4 font-medium space-y-3 flex flex-col ">
        <Link to={"/"}>
          <li className="flex items-center gap-2 cursor-pointer hover:text-[#00C8AC] hover:pl-2 transition-all ease-in-out duration-300">
            <AiOutlineHome className="text-xl" />
            <p>Home</p>
          </li>
        </Link>

        {isLoggedIn && (
          <li className="relative">
            <div
              onClick={() => setDropDownMenu(!dropDownMenu)}
              className="flex items-center justify-between cursor-pointer hover:text-[#00C8AC] hover:pl-2 transition-all ease-in-out duration-300"
            >
              {userRole.includes(ADMIN_ROLE) ? (
                <div className="flex items-center gap-2">
                  <MdOutlineDashboard className="text-xl" />
                  <p>Dashboard</p>
                </div>
              ) : (
                <Link to={"/dashboard/user"}>
                  <div className="flex items-center gap-2">
                    <MdOutlineDashboard className="text-xl" />
                    <p>Dashboard</p>
                  </div>
                </Link>
              )}
              {userRole.includes(ADMIN_ROLE) && (
                <div>{dropDownMenu ? <BsCaretUp /> : <BsCaretDown />}</div>
              )}
            </div>

            {dropDownMenu && userRole.includes(ADMIN_ROLE) && (
              <ul className="pl-8 pt-2 space-y-3 flex flex-col">
                <Link to={"/dashboard/admin"}>
                  <li className="flex items-center gap-2 cursor-pointer hover:text-[#00C8AC] hover:pl-2 transition-all ease-in-out duration-300">
                    <GrOverview className="text-lg" />
                    <p>Overview</p>
                  </li>
                </Link>

                <Link to={"/dashboard/admin/student"}>
                  <li className="flex items-center gap-2 cursor-pointer hover:text-[#00C8AC] hover:pl-2 transition-all ease-in-out duration-300">
                    <AiOutlineDatabase className="text-xl" />
                    <p>Students</p>
                  </li>
                </Link>

                <Link to={"/dashboard/admin/category"}>
                  <li className="flex items-center gap-2 cursor-pointer hover:text-[#00C8AC] hover:pl-2 transition-all ease-in-out duration-300">
                    <MdOutlineCategory className="text-xl" />
                    <p>Category</p>
                  </li>
                </Link>

                <Link to={"/dashboard/admin/question"}>
                  <li className="flex items-center gap-2 cursor-pointer hover:text-[#00C8AC] hover:pl-2 transition-all ease-in-out duration-300">
                    <BsQuestion className="text-xl" />
                    <p>Questions</p>
                  </li>
                </Link>
              </ul>
            )}
          </li>
        )}

        <Link to={"/contact"}>
          <li className="flex items-center gap-2 cursor-pointer hover:text-[#00C8AC] hover:pl-2 transition-all ease-in-out duration-300">
            <GrContact className="text-lg" />
            <p>Contact Us</p>
          </li>
        </Link>

        <Link to={"/about"}>
          <li className="flex items-center gap-2 cursor-pointer hover:text-[#00C8AC] hover:pl-2 transition-all ease-in-out duration-300">
            <AiOutlineUser className="text-xl" />
            <p>About Us</p>
          </li>
        </Link>
      </ul>

      {/* adding the login, signup and logout button */}
      <div className="absolute bottom-0 font-semibold w-full p-4">
        {isLoggedIn ? (
          <button
            onClick={() => dispatch(logout())}
            className="w-full border-2 py-1 border-[#00C8AC] rounded-sm bg-[#00C8AC] text-white transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]"
          >
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
