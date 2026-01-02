import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ForecastLayout from './pages/ForecastLayout';
import Forecast from './pages/Forecast';
import Settings from './pages/Settings';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Render Dashboard page
  if (currentPage === 'dashboard') {
    return (
      <Layout>
        <Dashboard />
        {/* Demo navigation buttons */}
        <div className="fixed bottom-6 right-6 flex gap-3 z-50">
          <button
            onClick={() => setCurrentPage('forecast')}
            className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg font-bold shadow-lg transition-all"
          >
            View Forecast
          </button>
          <button
            onClick={() => setCurrentPage('settings')}
            className="px-4 py-2 bg-surface-dark hover:bg-surface-highlight text-white rounded-lg font-bold shadow-lg transition-all border border-[#233c48]"
          >
            Settings
          </button>
        </div>
      </Layout>
    );
  }

  // Render Forecast page
  if (currentPage === 'forecast') {
    return (
      <ForecastLayout>
        <Forecast />
        {/* Demo navigation button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg font-bold shadow-lg transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </ForecastLayout>
    );
  }

  // Render Settings page
  if (currentPage === 'settings') {
    return (
      <>
        <Settings />
        {/* Demo navigation button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg font-bold shadow-lg transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </>
    );
  }

  return null;
}

export default App;