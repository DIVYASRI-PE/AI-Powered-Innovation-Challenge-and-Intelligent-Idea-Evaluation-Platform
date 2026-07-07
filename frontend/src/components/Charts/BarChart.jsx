import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, title, color = 'violet', horizontal = false }) => {
  const colorSchemes = {
    violet: {
      primary: 'rgb(139, 92, 246)',
      secondary: 'rgba(139, 92, 246, 0.7)',
      hover: 'rgb(124, 58, 237)'
    },
    emerald: {
      primary: 'rgb(16, 185, 129)',
      secondary: 'rgba(16, 185, 129, 0.7)',
      hover: 'rgb(5, 150, 105)'
    },
    amber: {
      primary: 'rgb(245, 158, 11)',
      secondary: 'rgba(245, 158, 11, 0.7)',
      hover: 'rgb(217, 119, 6)'
    },
    rose: {
      primary: 'rgb(244, 63, 94)',
      secondary: 'rgba(244, 63, 94, 0.7)',
      hover: 'rgb(225, 29, 72)'
    }
  };

  const colors = colorSchemes[color] || colorSchemes.violet;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: data.label || 'Value',
        data: data.values,
        backgroundColor: data.values.map(() => colors.secondary),
        borderColor: data.values.map(() => colors.primary),
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: data.values.map(() => colors.hover),
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? 'y' : 'x',
    plugins: {
      legend: {
        display: false
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
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12
          }
        },
        beginAtZero: true
      }
    }
  };

  return (
    <div className="w-full h-80">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
