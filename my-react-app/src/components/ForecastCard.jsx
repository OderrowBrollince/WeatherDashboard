export default function ForecastCard({ day, date, icon, high, low, precipitation, isActive }) {
  const getPrecipitationStyle = () => {
    if (precipitation === 0) {
      return 'text-primary bg-primary/10';
    } else if (precipitation >= 60) {
      return 'text-blue-400 bg-blue-400/10 font-bold';
    } else {
      return 'text-slate-400 font-medium';
    }
  };

  return (
    <div
      className={`cursor-pointer relative overflow-hidden rounded-xl p-4 flex flex-col gap-3 transition-all transform hover:scale-[1.02] ${
        isActive
          ? 'border-2 border-primary bg-primary/5 dark:bg-surface-dark shadow-lg shadow-primary/10'
          : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-surface-highlight'
      }`}
    >
      {isActive && (
        <div className="absolute top-0 right-0 p-2">
          <div className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase">
            Selected
          </div>
        </div>
      )}

      <span className={`material-symbols-outlined text-4xl ${isActive ? 'text-primary' : 'text-slate-400'}`}>
        {icon}
      </span>

      <div className="flex flex-col gap-0.5">
        <h4 className="text-slate-900 dark:text-white text-lg font-bold">{day}</h4>
        <p className="text-slate-500 dark:text-[#92b7c9] text-sm">{date}</p>
      </div>

      <div className="mt-auto pt-2 border-t border-slate-200 dark:border-slate-700/50 flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-xs text-slate-500">High / Low</span>
          <span className="text-slate-900 dark:text-white font-bold">
            {high}° / {low}°
          </span>
        </div>
        <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${getPrecipitationStyle()}`}>
          <span className="material-symbols-outlined text-sm">water_drop</span>
          {precipitation}%
        </div>
      </div>
    </div>
  );
}
