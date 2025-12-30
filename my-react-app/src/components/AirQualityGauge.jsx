export default function AirQualityGauge({ value = 42, status = 'Good', description }) {
  const getStatusColor = () => {
    if (value <= 50) return 'text-green-500';
    if (value <= 100) return 'text-yellow-500';
    if (value <= 150) return 'text-orange-500';
    return 'text-red-500';
  };

  const getGaugeColor = () => {
    if (value <= 50) return '#22c55e';
    if (value <= 100) return '#eab308';
    if (value <= 150) return '#f97316';
    return '#ef4444';
  };

  const percentage = Math.min((value / 200) * 100, 100);
  const rotation = -135 + (percentage * 270) / 100;

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="relative size-48 flex items-center justify-center">
        {/* CSS Gauge Ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${getGaugeColor()} 0% ${percentage}%, #233c48 ${percentage}% 100%)`,
            mask: 'radial-gradient(transparent 65%, black 66%)',
            WebkitMask: 'radial-gradient(transparent 65%, black 66%)',
            transform: 'rotate(-135deg)'
          }}
        ></div>

        {/* Inner Content */}
        <div className="flex flex-col items-center z-10">
          <span className="text-5xl font-black text-slate-900 dark:text-white">{value}</span>
          <span className={`font-bold text-lg mt-1 ${getStatusColor()}`}>{status}</span>
        </div>

        {/* Active Dot Indicator */}
        <div
          className="absolute top-0 left-1/2 -ml-1.5 -mt-1 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] origin-[50%_100px]"
          style={{ transform: `rotate(${rotation}deg)` }}
        ></div>
      </div>

      {description && (
        <p className="text-center text-slate-500 dark:text-text-secondary text-sm mt-4 max-w-[280px]">
          {description}
        </p>
      )}
    </div>
  );
}
