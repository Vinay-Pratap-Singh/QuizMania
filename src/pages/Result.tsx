import { useLocation } from "react-router-dom";
import AnswerResult from "../components/AnswerResult";
import PieChart from "../components/PieChart";
import { IchartData, getRandomQuesAnswers } from "../redux/QuizSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { useEffect } from "react";
import { updateUserDetails } from "../redux/AuthSlice";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader/Loader";
import { ImyQuestionData } from "../config/interfaces";

const Result = () => {
  const { questions, userAnswers } = useLocation().state;
  const dispatch = useDispatch<AppDispatch>();
  const { failed, quizAttempted, passed } = useSelector(
    (state: RootState) => state.auth
  );
  const { answers, isLoading: answerLoading } = useSelector(
    (state: RootState) => state.quiz
  );
  const { isLoggedIn, uid } = useAuth();
  const { isLoading: authLoading } = useSelector(
    (state: RootState) => state.auth
  );

  let correctAnswer = 0,
    inCorrectAnswer = 0,
    notAttempted = 0;

  let questionsToBeDisplayed: ImyQuestionData[] = [];
  // matching the user answers
  for (let i = 0; i < questions.length; i++) {
    answers.map((element) => {
      if (element.qid === questions[i].id) {
        const data: ImyQuestionData = {
          question: questions[i].question,
          option1: questions[i].option1,
          option2: questions[i].option2,
          option3: questions[i].option3,
          option4: questions[i].option4,
          categoryName: questions[i].categoryName,
          correctOption: element.correctOption,
          description: element.description,
          id: questions[i].id,
        };
        questionsToBeDisplayed = [...questionsToBeDisplayed, data];
        if (element.correctOption === userAnswers[i]) {
          correctAnswer++;
        } else if (userAnswers[i] === "") {
          notAttempted++;
        } else {
          inCorrectAnswer++;
        }
      }
    });
  }
  // for storing correct, incorrect and not answered numbers
  const chartData: number[] = [correctAnswer, inCorrectAnswer, notAttempted];

  const data: IchartData = {
    labels: ["Correct Answers", "Incorrect Answers", "Not Attempted"],
    datasets: [
      {
        label: "Quiz Result",
        data: chartData,
        backgroundColor: ["#38ff63", "#ff3838", "#fff538"],
        hoverOffset: 4,
      },
    ],
  };

  // for getting the answers from db
  useEffect(() => {
    (async () => {
      const res = await dispatch(getRandomQuesAnswers(questions));
    })();
  }, []);

  // for setting the quiz status in db
  useEffect(() => {
    if (isLoggedIn && uid !== "") {
      let data = {
        failed,
        quizAttempted,
        passed,
        uid,
      };
      if (questions.length === 5 && correctAnswer > 2) {
        data.quizAttempted = quizAttempted + 1;
        data.passed = passed + 1;
      } else if (questions.length === 5 && correctAnswer <= 2) {
        data.quizAttempted = quizAttempted + 1;
        data.failed = failed + 1;
      } else if (questions.length === 10 && correctAnswer >= 5) {
        data.quizAttempted = quizAttempted + 1;
        data.passed = passed + 1;
      } else if (questions.length === 10 && correctAnswer < 5) {
        data.quizAttempted = quizAttempted + 1;
        data.failed = failed + 1;
      }
      (async () => {
        console.log("inside updation");
        await dispatch(updateUserDetails({ ...data }));
      })();
    }
  }, [isLoggedIn, uid, dispatch]);

  return authLoading || answerLoading ? (
    <Loader />
  ) : (
    <div className="flex flex-col items-center justify-center text-center min-h-screen w-full ml-60 my-10">
      <main className="flex flex-col items-center justify-center text-center gap-5">
        <header className="space-y-5">
          <h1 className="text-4xl font-bold">
            Congrats on completing the{" "}
            <span className="text-[#00C8AC]">Quiz</span>
          </h1>
          <p className="font-semibold">
            "You are among those who not only start, but also complete the quiz
            otherwise most people leave it in between"
          </p>
        </header>

        {/* section for displaying the result */}
        <section className="flex items-center gap-10">
          {/* total question card */}
          <div className="shadow-md rounded-md py-2 px-6 w-48">
            <h3 className="font-semibold">Total Questions</h3>
            <p className="font-bold text-2xl">
              {questions.length > 9 ? questions.length : "0" + questions.length}
            </p>
          </div>

          {/* correct answers card */}
          <div className="shadow-md rounded-md py-2 px-6 w-48">
            <h3 className="font-semibold">Correct Answers</h3>
            <p className="font-bold text-2xl">
              {correctAnswer > 9 ? correctAnswer : "0" + correctAnswer}
            </p>
          </div>

          {/* incorrect answers card */}
          <div className="shadow-md rounded-md py-2 px-6 w-48">
            <h3 className="font-semibold">Incorrect Answers</h3>
            <p className="font-bold text-2xl">
              {inCorrectAnswer > 9 ? inCorrectAnswer : "0" + inCorrectAnswer}
            </p>
          </div>

          {/* not attempted card */}
          <div className="shadow-md rounded-md py-2 px-6">
            <h3 className="font-semibold">Not Attempted</h3>
            <p className="font-bold text-2xl">
              {notAttempted > 9 ? notAttempted : "0" + notAttempted}
            </p>
          </div>
        </section>

        {/* displaying the result pie chart */}
        <PieChart {...data} />
      </main>

      {/* displaying the quiz Q&A summary */}
      <AnswerResult
        questionsToBeDisplayed={questionsToBeDisplayed}
        answersSelectedByUser={userAnswers}
      />
    </div>
  );
};

export default Result;
