import React from "react";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import "chart.js/auto";
import "moment";
import "chartjs-adapter-moment";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const TreatmentsGraph = ({ treatmentsData }) => {
  const [viewMode, setViewMode] = useState("year");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // default to current month

  useEffect(() => {
    if (viewMode === "year") {
      setSelectedMonth(0); //0 is Jan so itll show the full year
    }
  }, [viewMode]);

  const months = Array.from({ length: 12 }, (e, i) =>
    new Date(2024, i).toLocaleString("default", { month: "long" })
  );

  const handleMonthChange = (e) => {
    setSelectedMonth(months.indexOf(e.target.value));
  };

  const filteredData = treatmentsData
    .filter((item) => {
      const date = new Date(item.treatment_date);
      const year = date.getFullYear();
      const month = date.getMonth();
      return viewMode === "year"
        ? year === 2024
        : year === 2024 && month === selectedMonth;
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
          unit: viewMode === "year" ? "month" : "day",
        },
        max: new Date().toISOString().split("T")[0], // set max to today's date

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

  return (
    <div>
      {viewMode === "month" && (
        <FormControl variant="outlined" style={{ minWidth: 120 }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={months[selectedMonth]}
            onChange={handleMonthChange}
            label="Month"
          >
            {months.map((month, index) => (
              <MenuItem key={index} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setViewMode(viewMode === "year" ? "month" : "year")}
      >
        Switch to {viewMode === "year" ? "Month" : "Year"} View
      </Button>
      <Line data={data} options={options} />
    </div>
  );
};

export default TreatmentsGraph;
