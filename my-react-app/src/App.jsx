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
      <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
        <Dashboard />
      </Layout>
    );
  }

  // Render Forecast page
  if (currentPage === 'forecast') {
  return (
    <ForecastLayout setCurrentPage={setCurrentPage}>
      <Forecast />
    </ForecastLayout>
  );
}

  // Render Settings page
  if (currentPage === 'settings') {
    return (
      <Settings />
    );
  }

  return null;
}

export default App;