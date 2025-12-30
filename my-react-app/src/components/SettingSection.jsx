export default function SettingSection({ title, children }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
        {title}
      </h3>
      <div className="flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
}
