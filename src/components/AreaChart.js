import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

export default function AreaChart({ name, xaxis, data }) {
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
      stroke: {
        curve: "stepline",
      },
      labels: xaxis,
      yaxis: {
        opposite: true,
        tickAmount: 7,
      },
      xaxis: {
        tooltip: {
          enabled: false,
        },
      },
      legend: {
        horizontalAlign: "left",
      },
    },
  });

  return (
    <div className="chart -typeArea">
      <Chart
        options={state.options}
        series={state.series}
        type="area"
        height={350}
      />
    </div>
  );
}

AreaChart.propTypes = {
  name: PropTypes.string.isRequired,
  xaxis: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
};
