import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { isAxiosError } from 'axios';
import { getStation, getDepartures } from '../services/station.service';
import { getAlerts } from '../services/alert.service';
import { alertsForLines } from '../utils/alerts';
import type { Station } from '../models/station.model';
import type { Departure } from '../models/departure.model';
import type { Alert, AlertSeverity } from '../models/alert.model';

const severityStyles: Record<AlertSeverity, string> = {
  severe: 'border-red-500 bg-red-50 text-red-800',
  warning: 'border-amber-500 bg-amber-50 text-amber-800',
  info: 'border-blue-500 bg-blue-50 text-blue-800',
};

function StationPage() {
  const { id } = useParams<{ id: string }>();
  const [station, setStation] = useState<Station | null>(null);
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function load(stationId: string) {
      try {
        const [stationData, departureData, alertData] = await Promise.all([
          getStation(stationId),
          getDepartures(stationId),
          getAlerts(),
        ]);
        setStation(stationData);
        setDepartures(departureData);
        setAlerts(alertsForLines(alertData, stationData.lines));
      } catch (err) {
        if (isAxiosError(err) && err.response?.status === 404) {
          setError('Station not found.');
        } else {
          setError("Couldn't load this station. Make sure the server is running.");
        }
      } finally {
        setLoading(false);
      }
    }

    load(id);
  }, [id]);

  if (loading) {
    return <p className="rounded-xl bg-white p-6 text-slate-500 shadow-sm">Loading station…</p>;
  }

  if (error || !station) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800">
          {error}
        </p>
        <Link to="/" className="mt-4 inline-block text-blue-700 underline">
          Back to search
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800">{station.name}</h2>
        <p className="mt-1 text-slate-500">Lines {station.lines.join(' · ')}</p>
      </div>

      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div key={alert.id} className={`border-l-4 p-4 ${severityStyles[alert.severity]}`}>
              <p className="font-semibold">
                {alert.line} · {alert.title}
              </p>
              <p className="text-sm">{alert.description}</p>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800">Next departures</h3>

        {departures.length === 0 ? (
          <p className="mt-3 text-slate-600">No upcoming departures.</p>
        ) : (
          <ul className="mt-3 divide-y divide-slate-100">
            {departures.map((departure) => (
              <li key={departure.id} className="flex items-center gap-3 py-3">
                <span className="rounded bg-amber-100 px-2 py-0.5 text-sm font-semibold text-amber-800">
                  {departure.line}
                </span>
                <span className="flex-1 text-slate-800">{departure.destination}</span>
                <span className="text-sm text-slate-500">Platform {departure.platform}</span>
                <span className="w-16 text-right font-semibold text-slate-800">
                  {departure.minutesAway} min
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link to="/" className="inline-block text-blue-700 underline">
        ← Back to search
      </Link>
    </div>
  );
}

export default StationPage;