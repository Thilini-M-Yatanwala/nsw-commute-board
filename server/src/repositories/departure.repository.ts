import { departures } from '../data/seed'
import type { Departure } from '../models/departure.model'

export const departureRepository = {
  async findByStationId(stationId: string): Promise<Departure[]> {
    return departures
      .filter((d) => d.stationId === stationId) //keep only this station's departures
      .sort((a, b) => a.minutesAway - b.minutesAway) // order them, soonest first
  },
}

// ** notes ts ** : 
/*
stationId: string: the caller must pass text.
Promise<Departure[]>: returns a list, which may be empty [] if the station has no departures. There’s no undefined this time, because filter always returns an array.
*/