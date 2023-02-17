import { AiOutlineGoogle } from "react-icons/ai";

const Signup = () => {
  return (
    <div className="h-[85vh] flex items-center justify-center">
      {/* creating the login form */}
      <form className="shadow-md rounded-md flex flex-col gap-4 p-4 items-center w-80 ">
        {/* adding the google auth button */}
        <button className="w-full rounded-sm font-bold py-2 border hover:border-black transition-all ease-in-out duration-300 flex items-center justify-center gap-2">
          <AiOutlineGoogle size={20} />
          <p>Continue with Google</p>
        </button>

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
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="font-semibold text-lg">Email</label>
          <input
            className="border border-white border-b-black"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="font-semibold text-lg">Password</label>
          <input
            className="border border-white border-b-black"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* signup page option */}
        <p>
          Already have an account?{" "}
          <span className="text-[#00C8AC] font-semibold">Login</span>
        </p>

        {/* adding the submit button */}
        <button className="bg-[#1fe8cd] w-full rounded-sm text-white font-bold py-2 hover:bg-[#15dbc0] transition-all duration-300 ease-in-out">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
