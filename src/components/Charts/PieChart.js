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
      <canvas width="300" height="300" ref={refChart} />
    </div>
  );
}

function buildChart(ctx, { series, labels }) {
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
      responsive: true,
      tooltips: {
        displayColors: false,
        callbacks: {
          title: function () {
            return "";
          },
          label: function (item, data) {
            var v = data.datasets[item.datasetIndex].data[item.index];
            return ["TOOLTIP"];
          },
        },
      },
    },
  });
}
