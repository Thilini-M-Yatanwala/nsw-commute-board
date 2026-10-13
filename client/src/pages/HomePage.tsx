import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getStations } from '../services/station.service'
import type { Station } from '../models/station.model'

function HomePage() {
  const [search, setSearch] = useState('')                       
  const [stations, setStations] = useState<Station[]>([])

  useEffect(() => {
    getStations(search).then(setStations)                         
  }, [search])                                                   

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Find your station</h2>

      {/* NEW: search box */}
      <label htmlFor="station-search" className="mt-4 block text-sm font-medium text-slate-700">
        Search station
      </label>
      <input
        id="station-search"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Parramatta"
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />

      {/* NEW: empty state */}
      {search && stations.length === 0 && (
        <p className="mt-4 text-slate-600">No stations match "{search}". Try another name.</p>
      )}

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
    </div>
  )
}

export default HomePage