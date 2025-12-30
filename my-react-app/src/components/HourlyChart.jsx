export default function HourlyChart() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Hourly Forecast</h3>
          <p className="text-sm text-slate-500 dark:text-[#92b7c9]">Today, Oct 24</p>
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
              x1="236"
              x2="236"
              y1="20"
              y2="150"
            >
              <stop stopColor="#13a4ec" stopOpacity="0.3"></stop>
              <stop offset="1" stopColor="#13a4ec" stopOpacity="0"></stop>
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <path
            d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z"
            fill="url(#chartGradient)"
          ></path>

          {/* Line Stroke */}
          <path
            d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
            stroke="#13a4ec"
            strokeLinecap="round"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          ></path>

          {/* Interaction Point Example */}
          <circle
            className="dark:stroke-[#101c22]"
            cx="218"
            cy="61"
            fill="#13a4ec"
            r="5"
            stroke="white"
            strokeWidth="2"
          ></circle>
        </svg>
      </div>

      {/* X-Axis Labels */}
      <div className="flex justify-between mt-4 px-2">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">12 PM</p>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">3 PM</p>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider text-primary">6 PM</p>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">9 PM</p>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">12 AM</p>
      </div>
    </div>
  );
}
