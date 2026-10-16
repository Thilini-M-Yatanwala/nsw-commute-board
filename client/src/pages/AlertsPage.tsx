import { useEffect, useState } from 'react';
import { getAlerts } from '../services/alert.service';
import AlertCard from '../components/AlertCard';
import type { Alert } from '../models/alert.model';

function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAlerts();
        setAlerts(data);
      } catch {
        setError("Couldn't load alerts. Make sure the server is running.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Service alerts</h2>
      <p className="mt-1 text-slate-600">Most serious first.</p>

      {loading && <p className="mt-4 text-slate-500">Loading alerts…</p>}

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-red-800">
          {error}
        </p>
      )}

      {!loading && !error && alerts.length === 0 && (
        <p className="mt-4 text-slate-600">No disruptions right now. Good travels!</p>
      )}

      {alerts.length > 0 && (
        <div className="mt-4 space-y-2">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AlertsPage;