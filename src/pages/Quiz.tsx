import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IuserAnswer } from "../redux/QuizSlice";
import { RootState } from "../redux/Store";
import { useRef } from "react";

const Quiz = () => {
  const navigate = useNavigate();

  const option = useSelector((state: RootState) => state.quiz.option);
  const [index, setIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<IuserAnswer[]>([]);
  const [value, setValue] = useState([]);
  const data = useSelector((state: RootState) => state.quiz.data);

  const inputFields1 = useRef<HTMLInputElement | null>(null);
  const inputFields2 = useRef<HTMLInputElement | null>(null);
  const inputFields3 = useRef<HTMLInputElement | null>(null);
  const inputFields4 = useRef<HTMLInputElement | null>(null);

  // console.log(inputFields1?.current?.checked);

  // function for rendering the next question
  const nextQuestion = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (index >= Number(option.length) - 1) {
      return;
    }
    setIndex(index + 1);
  };

  // function for rendering the previous question
  const previousQuestion = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (index <= 0) {
      return;
    }
    setIndex(index - 1);
  };

  // function to handle user input of options
  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userOptions: IuserAnswer = {
      id: data[index].id,
      index: index,
      userAnswer: event.target.value,
      correctAnswer: "",
    };

    const allOptions = [...userAnswer];
    allOptions[index] = userOptions;
    setUserAnswer(allOptions);
  };

  // redirect to homepage user is not visiting from starter page
  useEffect(() => {
    if (!option.isButtonClicked) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <div className="h-[85vh] flex items-center justify-center">
      {/* creating the quiz template */}
      <form className="w-1/2 flex flex-col py-5 px-10 space-y-5 rounded-lg shadow-md">
        {/* header part of card */}
        <header className="w-full flex items-center justify-between font-semibold">
          <h1>
            {index + 1} of {option.length}
          </h1>
          <h1>Timer : 04 : 30 min</h1>
        </header>

        {/* question and option section */}
        <section className="space-y-5 flex flex-col">
          <h1 className="font-bold">
            <span className="text-[#00C8AC]">Ques {index + 1}.</span>{" "}
            {data[index]?.question}
          </h1>

          {/* creating the options */}
          <div className="grid grid-cols-2 gap-y-5 gap-x-10 font-semibold">
            <div className="space-x-2">
              <input
                ref={inputFields1}
                type="radio"
                id="option1"
                // value={data[index]?.answers?.answer_a}
                name="option"
                onChange={handleUserInput}
              />
              <label htmlFor="option1"></label>
            </div>

            <div className="space-x-2">
              <input
                ref={inputFields2}
                type="radio"
                id="option2"
                // value={data[index]?.answers?.answer_b}
                name="option"
                onChange={handleUserInput}
              />
              <label htmlFor="option2"></label>
            </div>

            <div className="space-x-2">
              <input
                ref={inputFields3}
                type="radio"
                id="option3"
                // value={data[index]?.answers?.answer_c}
                name="option"
                onChange={handleUserInput}
              />
              <label htmlFor="option3"></label>
            </div>

            <div className="space-x-2">
              <input
                ref={inputFields4}
                type="radio"
                id="option4"
                // value={data[index]?.answers?.answer_d}
                name="option"
                onChange={handleUserInput}
              />
              <label htmlFor="option4"></label>
            </div>
          </div>

          {/* adding previous and next button */}
          <div className="flex items-center justify-between">
            <button
              onClick={previousQuestion}
              className="w-24 border-2 border-[#00C8AC] py-1 rounded-md font-bold text-[#00C8AC] transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]"
            >
              Previous
            </button>
            <button
              onClick={nextQuestion}
              className="w-24 border-2 border-[#00C8AC] py-1 rounded-md font-bold text-[#00C8AC] transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]"
            >
              Next
            </button>
          </div>

          {/* adding the submit button */}
          <button className="border-2 border-[#00C8AC] px-3 py-1 rounded-md font-bold text-lg bg-[#00C8AC] text-white transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC] w-fit self-center">
            Submit Answers
          </button>
        </section>
      </form>
    </div>
  );
};

export default Quiz;
