import Sidebar from './Sidebar';

export default function ForecastLayout({ children, city = 'Nairobi, Kenya', dateRange = 'Oct 24 - Oct 29' }) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto bg-background-light dark:bg-background-dark relative">
        {/* Page Heading */}
        <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 px-6 py-6 md:px-10">
          <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight dark:text-white text-slate-900">
                {city}
              </h2>
              <div className="flex items-center gap-2 text-slate-500 dark:text-[#92b7c9]">
                <span className="material-symbols-outlined text-xl">calendar_today</span>
                <p className="text-base font-normal">{dateRange}</p>
              </div>
            </div>
            <button className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-surface-highlight hover:bg-primary/20 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white transition-all group">
              <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              <span className="text-sm font-bold tracking-wide">Back to Home</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        {children}
      </main>
    </div>
  );
}
