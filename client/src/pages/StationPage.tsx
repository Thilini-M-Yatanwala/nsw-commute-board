import { useParams } from 'react-router'

function StationPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Station: {id}</h2>
      <p className="mt-1 text-slate-600">Departures will go here.</p>
    </div>
  )
}

export default StationPage