import { useMemo } from 'react';
import { useWeather } from '../context/WeatherContext';

export default function HourlyChart() {
  const { hourlyData } = useWeather();

  // Get today's date
  const todayDate = useMemo(() => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  }, []);

  // Process hourly data for chart (take first 24 hours or available data)
  const chartData = useMemo(() => {
    if (!hourlyData || hourlyData.length === 0) return null;

    const dataPoints = hourlyData.slice(0, 24); // Show next 24 hours
    const temps = dataPoints.map((d) => d.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const tempRange = maxTemp - minTemp || 1; // Avoid division by zero

    // Chart dimensions
    const chartWidth = 478;
    const chartHeight = 150;
    const padding = 20;
    const usableHeight = chartHeight - padding * 2;

    // Generate path for line using smooth curves
    let linePath = '';
    let areaPath = '';

    dataPoints.forEach((point, index) => {
      const x = (index / (dataPoints.length - 1 || 1)) * chartWidth;
      const normalizedTemp = (point.temp - minTemp) / tempRange;
      const y = chartHeight - padding - normalizedTemp * usableHeight;

      if (index === 0) {
        linePath = `M ${x} ${y}`;
        areaPath = `M ${x} ${chartHeight - padding}`;
      } else {
        const prevX = ((index - 1) / (dataPoints.length - 1 || 1)) * chartWidth;
        const prevNormalizedTemp = (dataPoints[index - 1].temp - minTemp) / tempRange;
        const prevY = chartHeight - padding - prevNormalizedTemp * usableHeight;

        // Smooth curve using quadratic bezier
        const controlX = (prevX + x) / 2;
        linePath += ` Q ${controlX} ${prevY} ${x} ${y}`;
        areaPath += ` Q ${controlX} ${prevY} ${x} ${y}`;
      }
    });

    // Close area path
    areaPath += ` L ${chartWidth} ${chartHeight - padding} L 0 ${chartHeight - padding} Z`;

    // Get time labels (show 5 evenly spaced labels)
    const timeLabels = [];
    const labelCount = 5;
    for (let i = 0; i < labelCount; i++) {
      const index = Math.floor((i / (labelCount - 1)) * (dataPoints.length - 1));
      if (dataPoints[index]) {
        timeLabels.push({
          time: dataPoints[index].time,
          x: (index / (dataPoints.length - 1 || 1)) * chartWidth,
        });
      }
    }

    return {
      linePath,
      areaPath,
      timeLabels,
      dataPoints,
      minTemp,
      maxTemp,
    };
  }, [hourlyData]);

  if (!chartData || !hourlyData || hourlyData.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Hourly Forecast</h3>
            <p className="text-sm text-slate-500 dark:text-[#92b7c9]">{todayDate}</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-[220px] md:h-[280px]">
          <p className="text-slate-500 dark:text-[#92b7c9]">No hourly data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Hourly Forecast</h3>
          <p className="text-sm text-slate-500 dark:text-[#92b7c9]">{todayDate}</p>
        </div>
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Temperature</span>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative w-full h-[220px] md:h-[280px]">
        <svg
          className="overflow-visible"
          fill="none"
          height="100%"
          preserveAspectRatio="none"
          viewBox="0 0 478 150"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradient Definition */}
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="chartGradient"
              x1="239"
              x2="239"
              y1="20"
              y2="150"
            >
              <stop stopColor="#13a4ec" stopOpacity="0.3"></stop>
              <stop offset="1" stopColor="#13a4ec" stopOpacity="0"></stop>
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <path d={chartData.areaPath} fill="url(#chartGradient)"></path>

          {/* Line Stroke */}
          <path
            d={chartData.linePath}
            stroke="#13a4ec"
            strokeLinecap="round"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          ></path>

          {/* Data Points */}
          {chartData.dataPoints.map((point, index) => {
            const x = (index / (chartData.dataPoints.length - 1 || 1)) * 478;
            const normalizedTemp = (point.temp - chartData.minTemp) / (chartData.maxTemp - chartData.minTemp || 1);
            const y = 150 - 20 - normalizedTemp * 110;
            return (
              <circle
                key={index}
                className="dark:stroke-[#101c22]"
                cx={x}
                cy={y}
                fill="#13a4ec"
                r="4"
                stroke="white"
                strokeWidth="2"
              ></circle>
            );
          })}
        </svg>
      </div>

      {/* X-Axis Labels */}
      <div className="flex justify-between mt-4 px-2">
        {chartData.timeLabels.map((label, index) => (
          <p
            key={index}
            className={`text-slate-400 text-xs font-bold uppercase tracking-wider ${
              index === Math.floor(chartData.timeLabels.length / 2) ? 'text-primary' : ''
            }`}
          >
            {label.time}
          </p>
        ))}
      </div>
    </div>
  );
}