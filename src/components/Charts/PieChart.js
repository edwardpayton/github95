import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

const chartProps = ({ series, labels }) => {
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
        speed: 0,
      },
      colors: ["#eb8a8a", "#f5f794", "#db9adb", "#b4decb", "#8ca7ec"],
      dataLabels: {
        style: {
          fontSize: "8px",
          fontFamily: "Windows 95",
          colors: ["#000"],
        },
        dropShadow: {
          enabled: false,
        },
      },
    },
  };
};

export default function PieChart({ data }) {
  const [state, set] = React.useState(chartProps(data));

  React.useEffect(() => {
    set(chartProps(data));
  }, [data]);

  return (
    <div className="pieChart">
      <Chart
        options={state.options}
        series={state.series}
        type="pie"
        width={400}
      />
    </div>
  );
}
