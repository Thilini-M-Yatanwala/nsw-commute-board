export interface Departure {
  id: string
  stationId: string
  line: string
  destination: string
  platform: number
  minutesAway: number
}

// eg : { id: 'd1', stationId: 'parramatta', line: 'T1', destination: 'City via Strathfield', platform: 3, minutesAway: 2 }