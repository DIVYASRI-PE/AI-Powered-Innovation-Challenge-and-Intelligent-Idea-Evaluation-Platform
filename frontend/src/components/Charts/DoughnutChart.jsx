import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const DoughnutChart = ({ data, title }) => {
  const colorPalette = [
    'rgb(139, 92, 246)',
    'rgb(16, 185, 129)',
    'rgb(245, 158, 11)',
    'rgb(244, 63, 94)',
    'rgb(59, 130, 246)',
    'rgb(236, 72, 153)',
    'rgb(34, 197, 94)',
    'rgb(251, 146, 60)'
  ];

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: colorPalette.slice(0, data.values.length),
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverOffset: 10
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 12
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold'
        },
        color: '#1f2937',
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        padding: 12,
        cornerRadius: 8
      }
    },
    cutout: '60%'
  };

  return (
    <div className="w-full h-80">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DoughnutChart;
