import { useEffect } from "react";
import { Link } from "react-router-dom";
import mainImage from "../assets/mainImage.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/AuthSlice";
import { AppDispatch, RootState } from "../redux/Store";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader/Loader";

const Homepage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, uid } = useAuth();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (isLoggedIn && uid) {
      (async () => {
        await dispatch(getUserData(uid));
      })();
    }
  }, [isLoggedIn]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="h-screen flex items-center justify-center gap-16 w-full ml-60">
      {/* creating the container for image */}
      <div>
        <img className="w-80 drop-shadow-lg" src={mainImage} alt="mainImage" />
      </div>

      {/* creating the container for text */}
      <div className="w-[400px] space-y-6">
        <h1 className="text-4xl font-bold">
          Brushup Your <span className="text-[#00C8AC]">Technical Skills</span>
        </h1>
        <p className="font-semibold">
          It is great place to brush up all your technical skills. We have a
          huge library of technical question of multiple technical fields, which
          are eventually created by the{" "}
          <span className="text-[#00C8AC]">industry experts</span>.
        </p>

        {/* adding the buttons */}
        <div>
          <Link to={"/starter"}>
            <button className="border-2 border-[#00C8AC] px-6 py-2 rounded-lg font-bold text-lg bg-[#00C8AC] text-white transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]">
              Start Quiz
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
