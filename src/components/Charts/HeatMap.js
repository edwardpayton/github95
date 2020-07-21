import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

const chartProps = (series, ranges) => {
  return {
    series,
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
      legend: {
        show: false,
      },
      grid: {
        show: false,
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
        crosshairs: {
          show: false,
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
          formatter: function (value, { seriesIndex, dataPointIndex }) {
            const date = series[seriesIndex].data[dataPointIndex].x;
            return `${date}: ${value}`;
          },
        },
        marker: {
          show: false,
        },
      },
      plotOptions: {
        heatmap: {
          radius: 0,
          enableShades: false,
          colorScale: {
            ranges,
          },
        },
      },
    },
  };
};

export default function HeatChart({ data }) {
  const [state, setState] = React.useState(
    chartProps(data.series, data.ranges)
  );

  React.useEffect(() => {
    setState(chartProps(data.series, data.ranges));
  }, [data]);

  return (
    <div className="chart -typeArea">
      <Chart
        options={state.options}
        series={state.series}
        type="heatmap"
        height={150}
      />
    </div>
  );
}

// HeatChart.propTypes = {
//   data: PropTypes.arrayOf().isRequired, // TODO
// };
