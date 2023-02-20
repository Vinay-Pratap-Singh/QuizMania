import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { IchartData } from "../redux/QuizSlice";

const PieChart = (props: IchartData) => {
  // registering the required elements with chart
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = props;

  return (
    <div className="w-80">
      <Pie data={data} height={40} width={40} />
    </div>
  );
};

export default PieChart;
