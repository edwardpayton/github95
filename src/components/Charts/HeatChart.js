import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

function generateData(count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = (i + 1).toString();
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x: x,
      y: y,
    });
    i++;
  }
  return series;
}

export default function HeatChart({ data }) {
  const seriesData = () => {
    if (data === undefined) return [];

    const dailyContribArray = (days) =>
      days.map((day) => day.contributionCount);

    const seriesData = data.map((week) => {
      return {
        name: "",
        data: dailyContribArray(week.contributionDays),
      };
    });

    console.log(
      "~/Sites/github95/src/components/HeatChart >>>",
      data,
      seriesData
    );

    return seriesData;
  };

  const [state] = React.useState({
    series: seriesData(),
    options: {
      chart: {
        height: 350,
        type: "heatmap",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#208c71"],
    },
  });

  return (
    <div className="chart -typeArea">
      <Chart
        options={state.options}
        series={state.series}
        type="heatmap"
        height={300}
      />
    </div>
  );
}

// HeatChart.propTypes = {
//   data: PropTypes.arrayOf().isRequired, // TODO
// };
