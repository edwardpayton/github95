import React from "react";
import Chart from "react-apexcharts";

export default function Charts() {
  const [opts, setOpts] = React.useState({
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });
  const [series, setSeries] = React.useState([44, 55, 13, 43, 22]);

  return (
    <div className="chart">
      {" "}
      <Chart options={opts} series={series} type="pie" width="300" />
    </div>
  );
}
