import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  // registering the required elements with chart
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
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
    <div className="w-80">
      <Pie data={data} height={40} width={40} />
    </div>
  );
};

export default PieChart;
