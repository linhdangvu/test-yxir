import React, { useEffect, useState } from "react";
import "./chart.css";
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
import { lineChart1 } from "@/data/charts/line-chart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [lineChartData, setLineChartData] = useState(lineChart1);
  console.log(lineChartData);
  return (
    <div className="line-chart border-2 border-black p-4 rounded-md w-2/4">
      <h3 className="text-center font-semibold text-3xl">Line Chart</h3>
      <Line options={lineChartData.options} data={lineChartData.data} />
    </div>
  );
};

export default LineChart;
