import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import mainImage from "../assets/mainImage.png";
import { removeAnswers, setOption } from "../redux/QuizSlice";
import { RootState } from "../redux/Store";

const Homepage = () => {
  const dispatch = useDispatch();
  const { option } = useSelector((state: RootState) => state.quiz);

  // setting user answer to blank and isButtonClicked to false to restirct route misuse
  useEffect(() => {
    const obj = { ...option, isButtonClicked: false };
    dispatch(setOption(obj));
    dispatch(removeAnswers);
  }, []);

  return (
    <div className="h-[85vh] flex items-center justify-center gap-16">
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
