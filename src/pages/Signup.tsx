import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import {
  createAccountUsingEmail,
  createAccountUsingGoogle,
  IuserSignupData,
} from "../redux/AuthSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/Store";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [inputData, setInputData] = useState<IuserSignupData>({
    name: "",
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

  // function to handle create account using email
  const createNewAccountUsingEmail = (event: React.MouseEvent<HTMLElement>) => {
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

    // checking the password and email
    if (
      !inputData.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ) ||
      !inputData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
    ) {
      toast.error("Invalid email or password");
      setDisabled(false);
      return;
    }

    dispatch(createAccountUsingEmail(inputData));
    setDisabled(false);

    // clearing the state
    setInputData({ name: "", email: "", password: "" });
  };

  // function to handle create account using the google account
  const createNewAccountUsingGoogle = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (disabled) {
      return;
    }

    setDisabled(true);

    event.preventDefault();
    dispatch(createAccountUsingGoogle());

    setDisabled(false);
  };

  return (
    <div className="h-[85vh] flex items-center justify-center">
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
            <label className="font-semibold text-lg">Name</label>
            <input
              className="border border-white border-b-black"
              type="text"
              placeholder="Enter your name"
              required
              name="name"
              value={inputData.name}
              onChange={handleInput}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-semibold text-lg">Email</label>
            <input
              className="border border-white border-b-black"
              type="email"
              placeholder="Enter your email"
              required
              name="email"
              value={inputData.email}
              onChange={handleInput}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-semibold text-lg">Password</label>
            <input
              className="border border-white border-b-black"
              type="password"
              placeholder="Enter your password"
              required
              name="password"
              value={inputData.password}
              onChange={handleInput}
            />
          </div>

          {/* signup page option */}
          <p>
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

      {/* adding the toaster component */}
      <Toaster />
    </div>
  );
};

export default Signup;
