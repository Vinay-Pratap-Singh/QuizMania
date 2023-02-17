const Login = () => {
  return (
    <div className="h-[85vh] flex items-center justify-center">
      {/* creating the login form */}
      <form className="shadow-md rounded-md flex flex-col gap-4 items-center w-80 ">
        <div className="flex flex-col w-full px-6 mt-6">
          <label className="font-semibold text-lg">Email</label>
          <input
            className="border border-white border-b-black"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="flex flex-col w-full px-6">
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
          <span className="text-[#00C8AC] font-semibold">signup</span>
        </p>

        {/* adding the submit button */}
        <button className="bg-[#1fe8cd] w-full rounded-bl-md rounded-br-md text-white font-bold py-2 hover:bg-[#15dbc0] transition-all duration-300 ease-in-out">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
