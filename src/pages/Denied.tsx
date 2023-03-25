import { useNavigate } from "react-router-dom";

const Denied = () => {
  const navigate = useNavigate();
  return (
    <div className="ml-60 flex items-center justify-center h-[100vh] w-full">
      {/* creating the denied card */}
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-6xl font-bold">403</h1>
        <h3 className="text-3xl font-semibold">Oops... Access Denied!</h3>
        <p>Sorry! The page you are trying to get is not accessible for you</p>
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

export default Denied;
