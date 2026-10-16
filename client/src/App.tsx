import { Routes, Route } from 'react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AlertsPage from './pages/AlertsPage';
import StationPage from './pages/StationPage';
import NotFoundPage from './pages/NotFoundPage';
import ReportPage from './pages/ReportPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/station/:id" element={<StationPage />} />
        <Route path="/station/:id/report" element={<ReportPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
