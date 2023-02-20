import { Link } from "react-router-dom";
import PieChart from "../../components/PieChart";
import { IchartData } from "../../redux/QuizSlice";

const Dashboard = () => {
  // chart data
  const data: IchartData = {
    labels: ["HTML", "CSS", "JavaScript"],
    datasets: [
      {
        label: "Questions",
        data: [30, 30, 40],
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
            Welcome to the{" "}
            <span className="text-[#00C8AC]">Admin Dashboard</span>
          </h1>
          <p className="font-semibold">
            "Here is the complete details about the user statistics"
          </p>
        </header>

        {/* section for displaying the result */}
        <section className="flex items-center gap-10">
          {/* total student card */}
          <Link to={"/dashboard/student/record"}>
          <div className="shadow-md rounded-md py-2 px-6 w-48 cursor-pointer">
            <h3 className="font-semibold">Total Students</h3>
            <p className="font-bold text-2xl">50</p>
          </div>
          </Link>

          {/* total category card */}
          <Link to={"/dashboard/question/category"}>
          <div className="shadow-md rounded-md py-2 px-6 w-48 cursor-pointer">
            <h3 className="font-semibold">Total Categories</h3>
            <p className="font-bold text-2xl">5</p>
          </div>
          </Link>

          {/* total question card */}
          <div className="shadow-md rounded-md py-2 px-6 w-48 cursor-pointer">
            <h3 className="font-semibold">Total Questions</h3>
            <p className="font-bold text-2xl">100</p>
          </div>
        </section>

        {/* displaying the result pie chart */}
        <PieChart {...data} />
      </main>
    </div>
  );
};

export default Dashboard;
