export default function LocationListItem({ city, country, onDelete }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-input-dark/50 group transition-colors cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center size-10 rounded-full bg-slate-100 dark:bg-input-dark text-slate-400 dark:text-text-secondary">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            drag_indicator
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-900 dark:text-white font-medium">{city}</span>
          <span className="text-slate-500 dark:text-text-secondary text-xs">{country}</span>
        </div>
      </div>
      <button
        onClick={onDelete}
        className="size-8 flex items-center justify-center rounded-full hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
          delete
        </span>
      </button>
    </div>
  );
}
