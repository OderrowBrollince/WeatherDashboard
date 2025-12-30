export default function ErrorState({ message, onRetry }) {
  return (
    <div className="bg-surface-dark rounded-xl p-6 border border-red-900/50 bg-red-900/5 h-[200px] flex flex-col items-center justify-center text-center">
      <div className="bg-red-500/10 p-3 rounded-full mb-3">
        <span className="material-symbols-outlined text-red-500">error_outline</span>
      </div>
      <h3 className="text-white font-bold mb-1">
        {message || 'Failed to load weather data'}
      </h3>
      <p className="text-[#92b7c9] text-sm mb-4">
        Check your internet connection or city name.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-[#233c48] hover:bg-[#2d4a58] text-white text-sm font-bold rounded-lg transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
