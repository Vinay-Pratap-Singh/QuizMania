import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getRandomQuestions } from "../redux/QuizSlice";
import { AppDispatch, RootState } from "../redux/Store";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader/Loader";
import Modal from "../components/Modal";
import { IquestionSchema } from "../config/interfaces";

const Quiz = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // getting the data from location
  const { category, length } = useLocation().state;
  const { questions, isLoading } = useSelector(
    (state: RootState) => state.quiz
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  // setting the time limit for quiz
  const [timeLeft, setTimeLeft] = useState(Number(length) === 5 ? 300 : 600);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // function to handle option change
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = [...userAnswers];
    data[currentIndex] = event.currentTarget.value;
    setUserAnswers([...data]);
  };

  // function to handle next button
  const handleNextBtnClick = () => {
    if (currentIndex + 1 >= length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // function to handle previous button
  const handlePreviousBtnClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // function to check full screen
  const handleFullScreenChange = () => {
    if (!document.fullscreenElement) {
      toast.error("Quiz submitted because of suspicious activity");
      document.exitFullscreen();
      navigate("/result", {
        state: { questions, userAnswers },
      });
    }
  };

  // for handling the timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);
    return () => clearInterval(timerRef.current as NodeJS.Timeout);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timerRef.current as NodeJS.Timeout);
      toast.success("Answers submitted successfully");
      navigate("/result", {
        state: { questions, userAnswers },
      });
      document.exitFullscreen();
    }
  }, [timeLeft]);

  // for getting the questions and users dummy answer filling
  useEffect(() => {
    if (!length || !category) {
      navigate(-1);
    }
    (async () => {
      const res = await dispatch(
        getRandomQuestions({
          categoryName: category,
          length: Number(length),
        })
      );

      // for checking the number of enough question
      const response = res.payload as IquestionSchema[];
      if (response.length < length) {
        document.exitFullscreen();
        toast.error("Sorry! Not enough questions in this category");
        navigate(-1);
      }
    })();

    // setting the dummy answers
    const data = [];
    for (let i = 0; i < length; i++) {
      data.push("");
    }
    setUserAnswers([...data]);
  }, []);

  // for full screen handling
  useEffect(() => {
    // requesting the full screen mode on mount
    document.documentElement.requestFullscreen();
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, [userAnswers]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  return isLoading ? (
    <Loader />
  ) : (
    <div className="h-screen w-full flex items-center justify-center select-none">
      {/* creating the quiz template */}
      <div className="w-2/4 flex flex-col py-5 px-10 space-y-5 rounded-lg shadow-md">
        {/* header part of card */}
        <header className="w-full flex items-center flex-col justify-between font-semibold space-y-4">
          <h1 className="text-2xl font-bold drop-shadow-sm">
            <span className="text-[#00C8AC]">{category} </span>
            Quiz
          </h1>
          <div className="w-full flex items-center justify-between font-bold">
            <h1>
              {currentIndex + 1} of {length}
            </h1>
            <h1>
              Timer :{" "}
              <span
                className={`${
                  minutes === 0 && seconds <= 30
                    ? "text-red-500"
                    : "text-[#00C8AC]"
                }`}
              >
                {minutes < 10 ? "0" + minutes : minutes} :{" "}
                {seconds < 10 ? "0" + seconds : seconds} min
              </span>
            </h1>
          </div>
        </header>

        {/* question and option section */}
        <section className="space-y-5 flex flex-col">
          <h1 className="font-bold">
            <span className="text-[#00C8AC]">Ques {currentIndex + 1}.</span>{" "}
            {questions[currentIndex]?.question}
          </h1>

          {/* creating the options */}
          <div className="grid grid-cols-2 gap-y-5 gap-x-10 font-semibold">
            <div className="space-x-2">
              <input
                type="radio"
                id="option1"
                value="option1"
                name="option"
                className="cursor-pointer"
                checked={userAnswers[currentIndex] === "option1"}
                onChange={handleOptionChange}
              />
              <label htmlFor="option1" className="align-middle cursor-pointer">
                {questions[currentIndex]?.option1}
              </label>
            </div>

            <div className="space-x-2">
              <input
                type="radio"
                id="option2"
                value="option2"
                name="option"
                className="cursor-pointer"
                checked={userAnswers[currentIndex] === "option2"}
                onChange={handleOptionChange}
              />
              <label htmlFor="option2" className="align-middle cursor-pointer">
                {questions[currentIndex]?.option2}
              </label>
            </div>

            <div className="space-x-2">
              <input
                type="radio"
                id="option3"
                value="option3"
                name="option"
                className="cursor-pointer"
                checked={userAnswers[currentIndex] === "option3"}
                onChange={handleOptionChange}
              />
              <label htmlFor="option3" className="align-middle cursor-pointer">
                {questions[currentIndex]?.option3}
              </label>
            </div>

            <div className="space-x-2">
              <input
                type="radio"
                id="option4"
                value="option4"
                name="option"
                className="cursor-pointer"
                checked={userAnswers[currentIndex] === "option4"}
                onChange={handleOptionChange}
              />
              <label htmlFor="option4" className="align-middle cursor-pointer">
                {questions[currentIndex]?.option4}
              </label>
            </div>
          </div>

          {/* adding previous and next button */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePreviousBtnClick}
              className="w-24 border-2 border-[#00C8AC] py-1 rounded-md font-bold text-[#00C8AC] transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]"
            >
              Previous
            </button>
            <button
              onClick={handleNextBtnClick}
              className="w-24 border-2 border-[#00C8AC] py-1 rounded-md font-bold text-[#00C8AC] transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]"
            >
              Next
            </button>
          </div>

          {/* adding the submit button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-[#00C8AC] px-3 py-1 rounded-md font-bold text-lg bg-[#00C8AC] text-white transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC] w-fit self-center"
          >
            Submit Answers
          </button>
        </section>
      </div>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          questions={questions}
          userAnswers={userAnswers}
        />
      )}
    </div>
  );
};

export default Quiz;
