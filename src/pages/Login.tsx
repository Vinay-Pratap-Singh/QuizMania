import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  usingGoogleAuthentication,
  IuserLoginData,
  loginUsingEmail,
} from "../redux/AuthSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/Store";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [inputData, setInputData] = useState<IuserLoginData>({
    email: "",
    password: "",
  });

  // for disabling the button from click
  const [disabled, setDisabled] = useState<boolean>(false);

  // function to handle input change
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  // function to handle login using email and password
  const LoginUsingEmailAccount = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      return;
    }

    // disabling the button click
    setDisabled(true);

    event.preventDefault();

    // checking the empty fields
    if (!inputData.email && !inputData.password) {
      toast.error("All fields are required");
      setDisabled(false);
      return;
    }

    dispatch(loginUsingEmail(inputData));
    setDisabled(false);

    // clearing the state
    setInputData({ email: "", password: "" });
  };

  // function to handle login using google account
  const loginUsingGoogleAccount = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      return;
    }

    setDisabled(true);

    event.preventDefault();
    dispatch(usingGoogleAuthentication());

    setDisabled(false);
  };

  return (
    <div className="h-[85vh] flex items-center justify-center">
      <div className="shadow-md rounded-md flex flex-col gap-4 items-center w-80 p-4">
        {/* adding the google auth button */}
        <button
          disabled={disabled}
          onClick={loginUsingGoogleAccount}
          className="w-full rounded-sm font-bold py-2 border hover:border-black transition-all ease-in-out duration-300 flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} />
          <p>Continue with Google</p>
        </button>

        {/* creating the login form */}
        <form className="flex flex-col gap-4 items-center w-full">
          {/* creating the seprator */}
          <div className="flex items-center w-full justify-between">
            <div className="h-[0.5px] bg-black w-28"></div>
            <span className="font-bold">OR</span>
            <div className="h-[0.5px] bg-black w-28"></div>
          </div>

          <div className="flex flex-col w-full">
            <label className="font-semibold">Email</label>
            <input
              className="border border-white border-b-black"
              type="email"
              name="email"
              onChange={handleInput}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-semibold">Password</label>
            <input
              className="border border-white border-b-black"
              type="password"
              name="password"
              onChange={handleInput}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* signup page option */}
          <p>
            Create a new account{" "}
            <Link to={"/signup"}>
              <span className="text-[#00C8AC] font-semibold">Signup</span>
            </Link>
          </p>

          {/* adding the submit button */}
          <button
            disabled={disabled}
            onClick={LoginUsingEmailAccount}
            className="bg-[#1fe8cd] w-full rounded-sm text-white font-bold py-2 hover:bg-[#15dbc0] transition-all duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
