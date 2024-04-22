export const kpiChart = {
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "KPI Chart Example",
      },
    },
  },

  data: {
    labels: [
      "Janvier",
      "Fevrier",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Aout",
      "Septembre",
      "Octobre",
      "Novembre",
      "Decembre",
    ],
    datasets: [
      {
        label: "Production Yield",
        data: [20, 50, 40, 50, 55, 44, 32, 35, 50, 25, 43, 50],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Defect Rate",
        data: [10, 12, 7, 14, 19, 16, 3, 8, 10, 14, 10, 5],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "On-time Delivery",
        data: [50, 65, 55, 67, 70, 60, 55, 67, 80, 90, 85, 95],
        borderColor: "rgb(247, 210, 176)",
        backgroundColor: "rgba(247, 210, 176, 0.5)",
      },
      {
        label: "Feedback",
        data: [15, 25, 20, 45, 34, 50, 43, 50, 60, 65, 60, 55],
        borderColor: "rgb(74, 145, 93)",
        backgroundColor: "rgba(74, 145, 93, 0.5)",
      },
    ],
  },
};

export const lineChart1 = {
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Line Chart Example",
      },
    },
  },

  data: {
    labels: [
      "Janvier",
      "Fevrier",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Aout",
      "Septembre",
      "Octobre",
      "Novembre",
      "Decembre",
    ],
    datasets: [
      {
        label: "Dataset 1",
        data: [30, 40, 35, 50, 49, 60, 70],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      // {
      //   label: "Dataset 2",
      //   data: [30, 40, 35, 50, 49, 60, 20],
      //   borderColor: "rgb(53, 162, 235)",
      //   backgroundColor: "rgba(53, 162, 235, 0.5)",
      // },
    ],
  },
};
