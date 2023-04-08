import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="ml-60 flex items-center justify-center h-screen w-full">
      {/* creating the error card */}
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-6xl font-bold">404</h1>
        <h3 className="text-3xl font-semibold">Oops... Page Not Found!</h3>
        <p>Sorry! The page you are trying to get is not available</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-3 border-2 px-6 py-1 font-bold text-center border-[#00C8AC] rounded-sm bg-[#00C8AC] text-white transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Error;
