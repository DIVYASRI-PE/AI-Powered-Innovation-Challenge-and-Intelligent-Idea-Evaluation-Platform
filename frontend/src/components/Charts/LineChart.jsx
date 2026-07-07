import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ data, title, color = 'violet' }) => {
  const colorSchemes = {
    violet: {
      primary: 'rgb(139, 92, 246)',
      secondary: 'rgba(139, 92, 246, 0.1)',
      gradient: ['rgba(139, 92, 246, 0.8)', 'rgba(139, 92, 246, 0.1)']
    },
    emerald: {
      primary: 'rgb(16, 185, 129)',
      secondary: 'rgba(16, 185, 129, 0.1)',
      gradient: ['rgba(16, 185, 129, 0.8)', 'rgba(16, 185, 129, 0.1)']
    },
    amber: {
      primary: 'rgb(245, 158, 11)',
      secondary: 'rgba(245, 158, 11, 0.1)',
      gradient: ['rgba(245, 158, 11, 0.8)', 'rgba(245, 158, 11, 0.1)']
    },
    rose: {
      primary: 'rgb(244, 63, 94)',
      secondary: 'rgba(244, 63, 94, 0.1)',
      gradient: ['rgba(244, 63, 94, 0.8)', 'rgba(244, 63, 94, 0.1)']
    }
  };

  const colors = colorSchemes[color] || colorSchemes.violet;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: data.label || 'Value',
        data: data.values,
        borderColor: colors.primary,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, colors.gradient[0]);
          gradient.addColorStop(1, colors.gradient[1]);
          return gradient;
        },
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: colors.primary,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  return (
    <div className="w-full h-80">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
