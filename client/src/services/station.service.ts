import { api } from './api'
import type { Station } from '../models/station.model'
import type { Departure } from '../models/departure.model'

export async function getStations(search: string): Promise<Station[]> {
  const res = await api.get<Station[]>('/stations', { params: { search } })
  return res.data
}

export async function getStation(id: string): Promise<Station> {
  const res = await api.get<Station>(`/stations/${id}`)
  return res.data
}

export async function getDepartures(stationId: string): Promise<Departure[]> {
  const res = await api.get<Departure[]>(`/stations/${stationId}/departures`)
  return res.data
}