import React from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";

export default function AreaChart({ data, labels }) {
  const refChart = React.useRef(undefined);

  React.useEffect(() => {
    if (!refChart.current) return;
    const ctx = refChart.current.getContext("2d");
    buildChart(ctx, data, labels);
  }, [refChart, data, labels]);

  return (
    <div className="areaChart">
      <canvas width="300" height="300" ref={refChart} />
      <div className="flex justify-between labels -x">
        <p>{labels[0]}</p>
        <p>{labels.slice(-1)[0]}</p>
      </div>
      <div className="flex flex-column justify-between labels -y">
        <p>{data.slice(-1)[0]}</p>
        <p>0</p>
      </div>
    </div>
  );
}

function buildChart(ctx, data, labels) {
  return new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          data,
          label: "",
          backgroundColor: "#8ca7ec",
          pointRadius: 0,
          fill: "start",
        },
      ],
    },
    options: {
      layout: {
        padding: {
          top: 20,
          bottom: 35,
          left: 0,
          right: 25,
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltips: {
        mode: "index",
        intersect: false,
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
      scales: {
        xAxes: [
          {
            display: false,
          },
        ],
        yAxes: [
          {
            display: false,
          },
        ],
      },
      animation: {
        duration: 0,
      },
    },
  });
}

AreaChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};
