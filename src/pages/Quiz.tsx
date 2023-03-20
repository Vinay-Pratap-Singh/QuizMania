import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllQuestion } from "../redux/QuizSlice";
import { AppDispatch, RootState } from "../redux/Store";
import { ImyQuestionData } from "../config/interfaces";
import { toast } from "react-hot-toast";

const Quiz = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // getting the data from location
  const userPreference = useLocation().state;

  // getting the questions from the database
  const allQuestions = useSelector((state: RootState) => state.quiz.questions);

  // getting the questions of a specific category based on user option
  const specificCategoryQuestions = allQuestions.filter((element) => {
    return element?.categoryName === userPreference?.category;
  });

  // total number of question for the quiz
  const noOfQuestions: number = Number(userPreference?.length) | 0;

  // to maintain the index count
  let [currentIndex, setCurrentIndex] = useState<number>(0);

  // for storing the questions to be displayed
  const questionsToBeDisplayed: ImyQuestionData[] = [];

  // for storing the answers selected by user
  const [answersSelectedByUser, setAnswersSelectedByUser] = useState<string[]>(
    []
  );

  // function to select the random questions from a specific category to display
  const selectRandomQuestions = (noOfQuestions: number) => {
    const indexes: number[] = [];

    // getting the random question from specific category question list
    while (indexes.length < noOfQuestions) {
      const randomValue = Math.floor(
        Math.random() * specificCategoryQuestions.length
      );

      let flag = true;
      indexes.forEach((element) => {
        if (element === randomValue) {
          flag = false;
        }
      });
      if (flag) {
        indexes.push(randomValue);
      }
    }

    // adding those index questions to the array to display
    indexes.forEach((element) => {
      questionsToBeDisplayed.push(specificCategoryQuestions[element]);
    });
  };

  if (
    specificCategoryQuestions.length !== 0 &&
    specificCategoryQuestions.length > noOfQuestions
  ) {
    selectRandomQuestions(noOfQuestions);
  }

  // function to handle the previous button click
  const handlePreviousButtonClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(noOfQuestions - 1);
      return;
    }

    setCurrentIndex(currentIndex - 1);

    // removing the seleted options
    const inputElements = document.querySelectorAll("input");
    inputElements.forEach((element) => {
      element.checked = false;
    });
  };

  // function to handle the next button click
  const handleNextButtonClick = () => {
    if (currentIndex === noOfQuestions - 1) {
      setCurrentIndex(0);
      return;
    }

    setCurrentIndex(currentIndex + 1);

    // removing the seleted options
    const inputElements = document.querySelectorAll("input");
    inputElements.forEach((element) => {
      element.checked = false;
    });
  };

  // function to get the selected option of user
  const handleRadioButtonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const answers = [...answersSelectedByUser];
    answers[currentIndex] = value;
    setAnswersSelectedByUser([...answers]);
  };

  // for loading the questions from database
  useEffect(() => {
    (async () => {
      await dispatch(getAllQuestion());
    })();

    // assigning empty value as default for the answers
    const answer = [];
    for (let i = 0; i < noOfQuestions; i++) {
      answer.push("");
    }
    setAnswersSelectedByUser([...answer]);
  }, []);

  return (
    <div className="h-[100vh] w-full ml-60 flex items-center justify-center">
      {/* creating the quiz template */}
      <div className="w-3/4 flex flex-col py-5 px-10 space-y-5 rounded-lg shadow-md">
        {/* header part of card */}
        <header className="w-full flex items-center flex-col justify-between font-semibold space-y-4">
          <h1 className="text-2xl font-bold drop-shadow-sm">
            <span className="text-[#00C8AC]">{userPreference?.category} </span>
            Quiz
          </h1>
          <div className="w-full flex items-center justify-between">
            <h1>
              {currentIndex + 1} of {noOfQuestions}
            </h1>
            <h1>Timer : 04 : 30 min</h1>
          </div>
        </header>

        {/* question and option section */}
        <section className="space-y-5 flex flex-col">
          <h1 className="font-bold">
            <span className="text-[#00C8AC]">Ques {currentIndex + 1}.</span>{" "}
            {questionsToBeDisplayed[currentIndex]?.question}
          </h1>

          {/* creating the options */}
          <div
            className="grid grid-cols-2 gap-y-5 gap-x-10 font-semibold"
            onChange={handleRadioButtonChange}
          >
            <div className="space-x-2">
              <input
                type="radio"
                id="option1"
                value="option1"
                name="option"
                className="cursor-pointer"
              />
              <label htmlFor="option1" className="align-middle cursor-pointer">
                {questionsToBeDisplayed[currentIndex]?.option1}
              </label>
            </div>

            <div className="space-x-2">
              <input
                type="radio"
                id="option2"
                value="option2"
                name="option"
                className="cursor-pointer"
              />
              <label htmlFor="option2" className="align-middle cursor-pointer">
                {questionsToBeDisplayed[currentIndex]?.option2}
              </label>
            </div>

            <div className="space-x-2">
              <input
                type="radio"
                id="option3"
                value="option3"
                name="option"
                className="cursor-pointer"
              />
              <label htmlFor="option3" className="align-middle cursor-pointer">
                {questionsToBeDisplayed[currentIndex]?.option3}
              </label>
            </div>

            <div className="space-x-2">
              <input
                type="radio"
                id="option4"
                value="option4"
                name="option"
                className="cursor-pointer"
              />
              <label htmlFor="option4" className="align-middle cursor-pointer">
                {questionsToBeDisplayed[currentIndex]?.option4}
              </label>
            </div>
          </div>

          {/* adding previous and next button */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePreviousButtonClick}
              className="w-24 border-2 border-[#00C8AC] py-1 rounded-md font-bold text-[#00C8AC] transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]"
            >
              Previous
            </button>
            <button
              onClick={handleNextButtonClick}
              className="w-24 border-2 border-[#00C8AC] py-1 rounded-md font-bold text-[#00C8AC] transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC]"
            >
              Next
            </button>
          </div>

          {/* adding the submit button */}
          <button
            onClick={() =>
              navigate("/result", {
                state: { questionsToBeDisplayed, answersSelectedByUser },
              })
            }
            className="border-2 border-[#00C8AC] px-3 py-1 rounded-md font-bold text-lg bg-[#00C8AC] text-white transition-all ease-in-out duration-300 hover:shadow-[0_0_5px_#00C8AC] w-fit self-center"
          >
            Submit Answers
          </button>
        </section>
      </div>
    </div>
  );
};

export default Quiz;
