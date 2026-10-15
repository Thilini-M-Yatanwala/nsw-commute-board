import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getStations } from '../services/station.service';
import type { Station } from '../models/station.model';

function HomePage() {
  const [search, setSearch] = useState('');
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getStations(search);
        setStations(data);
      } catch {
        setError("Couldn't load stations. Make sure the server is running.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [search]);

  /** chain notation for above try/await */

  //   useEffect(() => {
  //     getStations(search)
  //       .then(setStations)
  //       .catch(() => setError("Couldn't load stations. Make sure the server is running."))
  //       .finally(() => setLoading(false))
  //   }, [search])

  //when typing, show loading and clear any old error
  function handleSearchChange(value: string) {
    setSearch(value);
    setLoading(true);
    setError(null);
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Find your station</h2>

      <label htmlFor="station-search" className="mt-4 block text-sm font-medium text-slate-700">
        Search station
      </label>
      <input
        id="station-search"
        type="search"
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Parramatta"
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />

      {loading && <p className="mt-4 text-slate-500">Loading stations…</p>}

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-red-800">
          {error}
        </p>
      )}

      {!loading && !error && search && stations.length === 0 && (
        <p className="mt-4 text-slate-600">No stations match "{search}". Try another name.</p>
      )}

      {!error && (
        <ul className="mt-4 divide-y divide-slate-100">
          {stations.map((station) => (
            <li key={station.id} className="flex items-center justify-between py-3">
              <Link to={`/station/${station.id}`} className="text-blue-700 hover:underline">
                {station.name}
              </Link>
              <span className="text-sm text-slate-500">{station.lines.join(' · ')}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
