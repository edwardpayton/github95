import React from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";
import "chartjs-chart-matrix";

export default function HeatMap({ data }) {
  const refChart = React.useRef(undefined);

  React.useEffect(() => {
    if (!refChart.current) return;
    const ctx = refChart.current.getContext("2d");
    buildChart(ctx, data);
  }, [refChart, data]);

  return (
    <div className="heatMap">
      <div className="heatMap__chart">
        <canvas width="670" height="100" ref={refChart} />
      </div>
      <div className="flex justify-between labels -x">
        <p>{data.start}</p>
        <p>{data.end}</p>
      </div>
      <div className="flex flex-column justify-between labels -y">
        <p>Sun</p>
        <p>Thurs</p>
        <p>Mon</p>
      </div>
    </div>
  );
}

function buildChart(ctx, data) {
  return new Chart(ctx, {
    type: "matrix",
    data: {
      datasets: [
        {
          label: "",
          data: data.series,
          backgroundColor: ({ dataset, dataIndex }) =>
            color(dataset, dataIndex, data.busiestSingleDay.v),
          borderWidth: 1,
          borderColor: "#ededed",
          // @ts-ignore
          width: ({ chart }) => {
            const { left, right } = chart.chartArea;
            return (right - left) / 60;
          },
          height: ({ chart }) => {
            const { top, bottom } = chart.chartArea;
            return (bottom - top) / 5;
          },
        },
      ],
    },
    options: {
      layout: {
        padding: {
          top: 20,
          bottom: 20,
          left: 0,
          right: 0,
        },
      },
      legend: {
        display: false,
      },
      tooltips: {
        displayColors: false,
        callbacks: {
          title: function () {
            return "";
          },
          label: function (item, data) {
            var v = data.datasets[item.datasetIndex].data[item.index];
            return [v["tooltip"]];
          },
        },
      },
      scales: {
        xAxes: [
          {
            type: "time",
            position: "bottom",
            offset: true,
            time: {
              unit: "week",
              round: "week",
              displayFormats: {
                week: "MMM DD",
              },
            },
            ticks: {
              display: false,
            },
            gridLines: {
              display: false,
              drawBorder: false,
              tickMarkLength: 0,
            },
          },
        ],
        yAxes: [
          {
            type: "time",
            offset: true,
            position: "right",
            time: {
              unit: "day",
              parser: "e",
              displayFormats: {
                day: "ddd",
              },
            },
            ticks: {
              display: false,
            },
            gridLines: {
              display: false,
              drawBorder: false,
              tickMarkLength: 0,
            },
          },
        ],
      },
      animation: {
        duration: 0,
      },
    },
  });
}

function color(dataset, i, max) {
  const alpha = dataset.data[i]["v"] / max;
  if (alpha === 1) return "rgb(46, 202, 163)";
  switch (true) {
    case alpha >= 0.75: {
      return "#1c44ac";
    }
    case alpha >= 0.5: {
      return "#4263bb";
    }
    case alpha >= 0.25: {
      return "#768ecf";
    }
    case alpha >= 0.1: {
      return "#bcc9ea";
    }
    case alpha >= 0.01: {
      return "#e5eaf9";
    }
    default: {
      return "#fff";
    }
  }
}
