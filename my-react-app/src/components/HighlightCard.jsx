export default function HighlightCard({ title, icon, value, unit, subtitle, progress }) {
  return (
    <div className="bg-surface-dark rounded-xl p-5 border border-[#233c48] hover:-translate-y-1 hover:border-primary transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[#92b7c9] text-sm font-medium">{title}</span>
        <div className="size-8 rounded-full bg-[#111c22] text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-white">{value}</span>
        <span className="text-lg text-[#92b7c9] mb-1">{unit}</span>
      </div>
      {subtitle && <p className="text-xs text-[#92b7c9] mt-2">{subtitle}</p>}
      {progress !== undefined && (
        <div className="w-full bg-[#111c22] rounded-full h-1.5 mt-3 overflow-hidden">
          <div className="bg-yellow-400 h-full rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
}
