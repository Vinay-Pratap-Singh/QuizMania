import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AnswerResult from "../components/AnswerResult";
import PieChart from "../components/PieChart";
import { IchartData } from "../redux/QuizSlice";
import { RootState } from "../redux/Store";

const Result = () => {
  const data: IchartData = {
    labels: ["Correct Answers", "Incorrect Answers", "Not Attempted"],
    datasets: [
      {
        label: "Quiz Result",
        data: [5, 3, 2],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <main className="flex flex-col items-center justify-center text-center gap-5">
        <header className="space-y-5">
          <h1 className="text-4xl font-bold">
            Congrats on completing the Quiz
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
            <p className="font-bold text-2xl">10</p>
          </div>

          {/* correct answers card */}
          <div className="shadow-md rounded-md py-2 px-6 w-48">
            <h3 className="font-semibold">Correct Answers</h3>
            <p className="font-bold text-2xl">05</p>
          </div>

          {/* incorrect answers card */}
          <div className="shadow-md rounded-md py-2 px-6 w-48">
            <h3 className="font-semibold">Incorrect Answers</h3>
            <p className="font-bold text-2xl">03</p>
          </div>

          {/* not attempted card */}
          <div className="shadow-md rounded-md py-2 px-6">
            <h3 className="font-semibold">Not Attempted</h3>
            <p className="font-bold text-2xl">02</p>
          </div>
        </section>

        {/* displaying the result pie chart */}
        <PieChart {...data} />
      </main>

      {/* displaying the quiz Q&A summary */}
      <AnswerResult />
    </div>
  );
};

export default Result;
