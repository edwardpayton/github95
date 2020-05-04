import React from "react";
import Chart from "react-apexcharts";

export default function Charts() {
  const [opts, setOpts] = React.useState({
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  });
  const [series, setSeries] = React.useState([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ]);

  return (
    <Chart options={opts} series={series} type="bar" width={500} height={320} />
  );
}
