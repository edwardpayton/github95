import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

const chartProps = (name, data) => {
  return {
    series: [
      {
        name,
        data,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 300,
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
      stroke: {
        colors: ["#8ca7ec"],
        curve: "straight",
        width: 1,
      },
      fill: {
        colors: "#8ca7ec",
        type: "solid",
      },
      grid: {
        show: false,
        padding: {
          right: 30,
          left: -20,
        },
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: true,
          color: "#8ca7ec",
          height: 1,
          width: "100%",
        },
        tooltip: {
          enabled: false,
        },
      },
      tooltip: {
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: () => "",
          },
        },
        marker: {
          show: false,
        },
      },
    },
  };
};

export default function AreaChart({ name, data, labels }) {
  const [state, set] = React.useState(chartProps(name, data));

  React.useEffect(() => {
    set(chartProps(name, data));
  }, [name, data]);

  return (
    <div className="areaChart">
      <Chart
        options={state.options}
        series={state.series}
        type="area"
        height={300}
      />
      <div className="flex justify-between areaChart__labelsX">
        <p>{labels[0]}</p>
        <p>{labels.slice(-1)[0]}</p>
      </div>
      <div className="flex flex-column justify-between areaChart__labelsY">
        <p>{data.slice(-1)[0]}</p>
        <p>0</p>
      </div>
    </div>
  );
}

AreaChart.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};
