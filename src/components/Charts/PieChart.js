import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

const chartProps = (data) => {
  const series = data.map(({ size }) => size);
  const labels = data.map(({ name }) => name);
  return {
    series,
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      labels,
      animations: {
        enabled: false,
      },
      colors: ["#eb8a8a", "#8ca7ec", "#f5f794", "#b4decb", "#db9adb"],
    },
  };
};

export default function PieChart({ topLangauges }) {
  const [state, set] = React.useState(chartProps(topLangauges));

  console.log("~/Sites/github95/src/components/Charts/PieChart >>>", state);
  return (
    <div className="areaChart">
      <Chart
        options={state.options}
        series={state.series}
        type="pie"
        width={400}
      />
    </div>
  );
}
