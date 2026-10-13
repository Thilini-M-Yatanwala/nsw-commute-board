import { stationRepository } from '../repositories/station.repository'
import { departureRepository } from '../repositories/departure.repository'
import type { Station } from '../models/station.model'
import type { Departure } from '../models/departure.model'

export const stationService = {
  async searchStations(search: string): Promise<Station[]> {
    return stationRepository.findAll(search)
  },

  async getStation(id: string): Promise<Station | undefined> {
    return stationRepository.findById(id)
  },

  // Returns undefined if the station doesn't exist, so the route can send 404
  async getDepartures(stationId: string): Promise<Departure[] | undefined> {
    const station = await stationRepository.findById(stationId)
    if (!station) return undefined

    return departureRepository.findByStationId(stationId)
  },
}