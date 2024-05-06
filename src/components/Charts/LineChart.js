import React from "react";
import ReactApexChart from "react-apexcharts";
import { lineChartData, lineChartOptions } from "variables/charts";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: props.chartData,
      chartOptions: props.chartOptions,
    };
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="line"
        width="100%"
        height="100%"
      />
    );
  }
}

export default LineChart;
