import { FcGoogle } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";
import {
  createAccountUsingEmail,
  IuserSignupData,
  usingGoogleAuthentication,
} from "../redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Loader from "../components/Loader/Loader";

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [inputData, setInputData] = useState<IuserSignupData>({
    name: "",
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

  // function to handle create account using email
  const createNewAccountUsingEmail = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (disabled) {
      return;
    }

    // disabling the button click
    setDisabled(true);

    event.preventDefault();

    // checking the empty fields
    if (!inputData.name && !inputData.email && !inputData.password) {
      toast.error("All fields are required");
      setDisabled(false);
      return;
    }

    // checking the password and name length
    if (inputData.name.length < 3 || inputData.password.length < 6) {
      toast.error("Name or Password length is short...");
      setDisabled(false);
      return;
    }

    // checking the password and email with regex code
    if (
      !inputData.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      toast.error("Invalid Email");
      setDisabled(false);
      return;
    }

    if (!inputData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
      toast.error(
        "Password should contain Uppercase, Lowercase, Number and Symbol"
      );
      setDisabled(false);
      return;
    }

    const res = await dispatch(createAccountUsingEmail(inputData));
    setDisabled(false);
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/");
    }

    // clearing the state
    setInputData({ name: "", email: "", password: "" });
  };

  // function to handle create account using the google account
  const createNewAccountUsingGoogle = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (disabled) {
      return;
    }

    setDisabled(true);

    event.preventDefault();
    await dispatch(usingGoogleAuthentication());

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
    <div className="h-screen w-full flex items-center justify-center ml-60">
      <div className="shadow-md rounded-md flex flex-col gap-4 p-4 items-center w-80 ">
        {/* adding the google auth button */}
        <button
          onClick={createNewAccountUsingGoogle}
          className="w-full rounded-sm font-bold py-2 border hover:border-black transition-all ease-in-out duration-300 flex items-center justify-center gap-2 cursor-pointer"
          disabled={disabled}
        >
          <FcGoogle size={20} />
          <p>Continue with Google</p>
        </button>

        {/* creating the signup form */}
        <form className="flex flex-col items-center gap-4 w-full">
          {/* creating the seprator */}
          <div className="flex items-center w-full justify-between">
            <div className="h-[0.5px] bg-black w-28"></div>
            <span className="font-bold">OR</span>
            <div className="h-[0.5px] bg-black w-28"></div>
          </div>

          <div className="flex flex-col w-full">
            <label className="font-semibold">Name</label>
            <input
              className="border border-white border-b-black"
              type="text"
              placeholder="Enter your name"
              required
              name="name"
              value={inputData.name}
              onChange={handleInput}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-semibold text">Email</label>
            <input
              className="border border-white border-b-black"
              type="email"
              placeholder="Enter your email"
              required
              name="email"
              value={inputData.email}
              onChange={handleInput}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col w-full relative">
            <label className="font-semibold text">Password</label>
            <input
              className="border border-white border-b-black"
              type={passwordStatus ? "text" : "password"}
              placeholder="Enter your password"
              required
              name="password"
              value={inputData.password}
              onChange={handleInput}
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
          <p className="font-medium">
            Already have an account?{" "}
            <Link to={"/login"}>
              <span className="text-[#00C8AC] font-semibold">Login</span>
            </Link>
          </p>

          {/* adding the submit button */}
          <button
            onClick={createNewAccountUsingEmail}
            className="bg-[#1fe8cd] w-full rounded-sm text-white font-bold py-2 hover:bg-[#15dbc0] transition-all duration-300 ease-in-out"
            disabled={disabled}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
