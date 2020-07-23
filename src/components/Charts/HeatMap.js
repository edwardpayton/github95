import React from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

export default function HeatChart({ series, ranges, onComplete }) {
  const updated = (e) => onComplete(e);
  const setChart = chartProps(updated);

  const [state, setState] = React.useState(setChart(series, ranges));

  React.useEffect(() => {
    setState(setChart(series, ranges));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [series, ranges]);

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

function chartProps(updated) {
  return (series, ranges) => {
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
          events: {
            updated,
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
        states: {
          active: {
            filter: {
              type: "none",
            },
          },
        },
      },
    };
  };
}

// PropTypes
const seriesShape = {
  name: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({ x: PropTypes.string, y: PropTypes.string })
  ),
};
const rangesShape = {
  from: PropTypes.number,
  to: PropTypes.number,
  color: PropTypes.string,
  name: PropTypes.string,
};
HeatChart.propTypes = {
  series: PropTypes.arrayOf(PropTypes.shape(seriesShape)).isRequired,
  ranges: PropTypes.arrayOf(PropTypes.shape(rangesShape)).isRequired,
  onComplete: PropTypes.func.isRequired,
};
