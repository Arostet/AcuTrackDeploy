import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "moment";
import "chartjs-adapter-moment"; // Explicitly import the adapter

const TreatmentsGraph = ({ treatmentsData }) => {
  const filteredData = treatmentsData
    .filter((item) => {
      const year = new Date(item.treatment_date).getFullYear();
      return year === 2024;
    })
    .sort((a, b) => new Date(a.treatment_date) - new Date(b.treatment_date));

  // Transforming treatment count data for Chart.js
  const data = {
    labels: filteredData.map((item) => item.treatment_date),
    datasets: [
      {
        label: "Number of Treatments",
        data: filteredData.map((item) => item.treatment_count),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Treatment Counts",
        },
      },
      x: {
        type: "time",
        time: {
          unit: "month",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TreatmentsGraph;
