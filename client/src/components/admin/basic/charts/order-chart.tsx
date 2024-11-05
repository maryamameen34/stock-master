import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const orderChartConfig: { series: { name: string; data: number[] }[]; options: ApexOptions } = {
  series: [
    {
      name: "Orders",
      data: [150, 230, 300, 250, 400, 450, 550, 600, 620, 700, 800, 850],
    },
  ],
  options: {
    chart: {
      type: "line",
      height: 300,
      toolbar: {
        show: false,
      },
    },
    colors: ["#1E3A8A"],
    stroke: {
      width: 3,
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      labels: {
        style: {
          colors: "#4B5563",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Number of Orders",
        style: {
          color: "#4B5563",
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 5,
    },
    markers: {
      size: 4,
      colors: ["#1E3A8A"],
      strokeWidth: 2,
    },
    tooltip: {
      theme: "dark",
      x: {
        show: true,
      },
    },
  },
};

const OrdersChart: React.FC = () => {
  return (
    <div className="rounded-lg lg:max-w-[650px] w-full mt-6 shadow-lg p-5 bg-white">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Monthly Orders
      </h2>
      <Chart
        options={orderChartConfig.options}
        series={orderChartConfig.series}
        type="line"
        height={orderChartConfig.options.chart?.height || 300}
      />
    </div>
  );
};

export default OrdersChart;
