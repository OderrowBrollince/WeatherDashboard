export default function PollutantCard({ name, value, unit = 'µg/m³', status = 'good' }) {
  const getStatusColor = () => {
    if (status === 'good') return 'text-green-500';
    if (status === 'moderate') return 'text-yellow-500';
    if (status === 'unhealthy') return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white dark:bg-card-dark p-3 rounded-lg border border-slate-100 dark:border-white/5 flex flex-col">
      <span className="text-xs text-slate-400 dark:text-text-secondary mb-1">{name}</span>
      <span className="text-slate-900 dark:text-white font-bold text-lg">{value}</span>
      <span className={`text-[10px] ${getStatusColor()}`}>{unit}</span>
    </div>
  );
}
