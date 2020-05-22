import React from "react";
import Chart from "react-apexcharts";

export default function AreaChart({ name, xaxis, data }) {
  console.log("~/Sites/github95/src/components/Charts >>>", xaxis, data);
  const [state] = React.useState({
    series: [
      {
        name,
        data,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      labels: xaxis,
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: "left",
      },
    },
  });

  return (
    <div className="chart">
      <Chart
        options={state.options}
        series={state.series}
        type="area"
        height={350}
      />
    </div>
  );
}
