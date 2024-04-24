import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { IChart } from "@/interface/kpi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = (props: IChart) => {
  const [lineChartData, setLineChartData] = useState(props.data);
  const [title, setTitle] = useState(props.title);

  return (
    <div className="line-chart border-2 border-black p-4 rounded-md">
      <h3 className="text-center font-semibold text-2xl">{title}</h3>

      <Line options={lineChartData.options} data={lineChartData.data} />
    </div>
  );
};

export default LineChart;
