import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  usingGoogleAuthentication,
  IuserLoginData,
  loginUsingEmail,
} from "../redux/AuthSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Loader from "../components/Loader/Loader";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [inputData, setInputData] = useState<IuserLoginData>({
    email: "",
    password: "",
  });

  // for disabling the button from click
  const [disabled, setDisabled] = useState<boolean>(false);

  // for show and hide password
  const [passwordStatus, setPasswordStatus] = useState<boolean>(false);

  // getting logged in status
  const { isLoggedIn, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  // function to handle input change
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  // function to handle login using email and password
  const LoginUsingEmailAccount = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
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

    await dispatch(loginUsingEmail(inputData));
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

  // redirect to homepage if logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="h-[100vh] w-full flex items-center justify-center ml-60">
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
              value={inputData.email}
              onChange={handleInput}
              placeholder="Enter your email"
              required
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col w-full relative">
            <label className="font-semibold">Password</label>
            <input
              className="border border-white border-b-black"
              type={passwordStatus ? "text" : "password"}
              name="password"
              value={inputData.password}
              onChange={handleInput}
              placeholder="Enter your password"
              required
              autoComplete="off"
            />
            <div
              onClick={() => setPasswordStatus(!passwordStatus)}
              className="absolute cursor-pointer right-0 top-6 text-xl"
            >
              {passwordStatus ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          </div>

          {/* signup page option */}
          <p>
            Create a new account{" "}
            <Link to={"/signup"}>
              <span className="text-[#00C8AC] font-semibold">Signup</span>
            </Link>
          </p>

          {/* for using the test credentials */}
          <p
            onClick={() => {
              setInputData({ email: "test@gmail.com", password: "Test@123" });
            }}
            className="text-[#00C8AC] font-semibold cursor-pointer"
          >
            Use test credentials
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
