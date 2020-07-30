import React from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";

export default function PieChart({ data }) {
  const refChart = React.useRef(undefined);

  React.useEffect(() => {
    if (!refChart.current) return;
    const ctx = refChart.current.getContext("2d");
    buildChart(ctx, data);
  }, [refChart, data]);

  return (
    <div className="pieChart">
      <canvas width="250" height="250" ref={refChart} />
    </div>
  );
}

function buildChart(ctx, { series, labels }) {
  const totalLines = series.reduce((a, b) => b + (a ? a : a));
  return new Chart(ctx, {
    type: "pie",
    data: {
      datasets: [
        {
          data: series,
          backgroundColor: [
            "#eb8a8a",
            "#f5f794",
            "#db9adb",
            "#b4decb",
            "#8ca7ec",
          ],
          label: "",
        },
      ],
      labels,
    },
    options: {
      layout: {
        padding: {
          bottom: 50,
        },
      },
      legend: {
        // position: "right",
        onClick: () => "",
        labels: {
          boxWidth: 10,
        },
      },
      tooltips: {
        displayColors: false,
        callbacks: {
          title: function () {
            return "";
          },
          label: function ({ index, datasetIndex }, data) {
            const val = data.datasets[datasetIndex].data[index];
            const lang = data.labels[index];
            // @ts-ignore
            return [`${lang} - ${((val / totalLines) * 100).toFixed(1)}%`];
          },
        },
      },
      animation: {
        duration: 0,
      },
    },
  });
}
