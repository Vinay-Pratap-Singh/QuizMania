import { useDispatch, useSelector } from "react-redux";
import PieChart from "../../components/PieChart";
import { getQuestions, IchartData } from "../../redux/QuizSlice";
import { AppDispatch, RootState } from "../../redux/Store";
import { useEffect, useState } from "react";
import { getUsersData } from "../../redux/UserSlice";
import { getCategory } from "../../redux/CategorySlice";
import Loader from "../../components/Loader/Loader";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: usersData, isLoading: userLoading } = useSelector(
    (state: RootState) => state.user
  );
  const { categoryData: categoriesData, isLoading: categoryLoading } =
    useSelector((state: RootState) => state.category);
  const { questions: questionsData, isLoading: questionLoading } = useSelector(
    (state: RootState) => state.quiz
  );

  interface IchartDataSet {
    labelName: string;
    questions: number;
  }
  let chartDataSet: IchartDataSet[] = [];
  let chartLabels: string[] = [];
  let questionsNumber: number[] = [];

  // chart data
  const [chartData, setChartData] = useState<IchartData>({
    labels: [],
    datasets: [
      {
        label: "Questions",
        data: [],
        backgroundColor: [],
        hoverOffset: 4,
      },
    ],
  });

  // getting the updated values from database
  useEffect(() => {
    (async () => {
      await dispatch(getUsersData());
      await dispatch(getCategory());
      await dispatch(getQuestions());
    })();
  }, []);

  useEffect(() => {
    chartDataSet = [];
    chartLabels = [];
    questionsNumber = [];

    categoriesData.map((element) => {
      chartDataSet.push({ labelName: element.categoryName, questions: 0 });
      chartLabels.push(element.categoryName);
    });

    // getting the chart details
    chartDataSet.map((element1) => {
      const questionDetails = questionsData.filter((element2) => {
        return element2.categoryName === element1.labelName;
      });
      element1.questions = questionDetails.length;
      questionsNumber.push(questionDetails.length);
    });

    const bgColors: string[] = [];
    for (let i = 0; bgColors.length < chartLabels.length; i++) {
      const color = Math.floor(Math.random() * 16777215).toString(16);
      const status = bgColors.includes(color);
      if (!status) {
        bgColors.push("#" + color);
      }
    }

    setChartData({
      labels: [...chartLabels],
      datasets: [
        {
          label: "Questions",
          data: [...questionsNumber],
          backgroundColor: [...bgColors],
          hoverOffset: 4,
        },
      ],
    });
  }, [categoriesData, questionsData, usersData]);

  return userLoading || categoryLoading || questionLoading ? (
    <Loader />
  ) : (
    <div className="flex flex-col items-center justify-center text-center w-full min-h-screen ml-60">
      <main className="flex flex-col items-center justify-center text-center gap-5">
        <header className="space-y-5">
          <h1 className="text-4xl font-bold">
            Welcome to the{" "}
            <span className="text-[#00C8AC]">Admin Dashboard</span>
          </h1>
          <p className="font-semibold">
            "Here is the complete details about the users, categories and
            questions statistics"
          </p>
        </header>

        {/* section for displaying the result */}
        <section className="flex items-center gap-10">
          {/* total student card */}
          <div className="shadow-md rounded-md py-2 px-6 w-48 cursor-pointer">
            <h3 className="font-semibold">Registered User</h3>
            <p className="font-bold text-2xl">
              {usersData && usersData.length > 9
                ? usersData.length
                : "0" + usersData.length}
            </p>
          </div>

          {/* total category card */}
          <div className="shadow-md rounded-md py-2 px-6 w-48 cursor-pointer">
            <h3 className="font-semibold">Total Categories</h3>
            <p className="font-bold text-2xl">
              {categoriesData.length > 9
                ? categoriesData.length
                : "0" + categoriesData.length}
            </p>
          </div>

          {/* total question card */}
          <div className="shadow-md rounded-md py-2 px-6 w-48 cursor-pointer">
            <h3 className="font-semibold">Total Questions</h3>
            <p className="font-bold text-2xl">
              {questionsData.length > 9
                ? questionsData.length
                : "0" + questionsData.length}
            </p>
          </div>
        </section>

        {/* displaying the questions based on category using pie chart */}
        <PieChart {...chartData} />
      </main>
    </div>
  );
};

export default Dashboard;
