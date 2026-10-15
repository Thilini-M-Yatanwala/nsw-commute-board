import type { Station } from '../models/station.model';
import type { Departure } from '../models/departure.model';
import type { Alert } from '../models/alert.model';
import type { Report } from '../models/report.model';

export const stations: Station[] = [
  { id: 'parramatta', name: 'Parramatta', lines: ['T1', 'T5'] },
  { id: 'central', name: 'Central', lines: ['T1', 'T2', 'T3', 'T4', 'T8'] },
  { id: 'strathfield', name: 'Strathfield', lines: ['T1', 'T2', 'T9'] },
  { id: 'chatswood', name: 'Chatswood', lines: ['T1', 'T9', 'M1'] },
  { id: 'blacktown', name: 'Blacktown', lines: ['T1', 'T5'] },
];

export const departures: Departure[] = [
  {
    id: 'd1',
    stationId: 'parramatta',
    line: 'T1',
    destination: 'City via Strathfield',
    platform: 3,
    minutesAway: 2,
  },
  {
    id: 'd2',
    stationId: 'parramatta',
    line: 'T1',
    destination: 'Emu Plains',
    platform: 1,
    minutesAway: 5,
  },
  {
    id: 'd3',
    stationId: 'parramatta',
    line: 'T5',
    destination: 'Leppington',
    platform: 2,
    minutesAway: 9,
  },
  {
    id: 'd4',
    stationId: 'central',
    line: 'T4',
    destination: 'Cronulla',
    platform: 24,
    minutesAway: 3,
  },
  {
    id: 'd5',
    stationId: 'central',
    line: 'T8',
    destination: 'Macarthur',
    platform: 23,
    minutesAway: 6,
  },
  {
    id: 'd6',
    stationId: 'strathfield',
    line: 'T9',
    destination: 'Hornsby',
    platform: 5,
    minutesAway: 4,
  },
  {
    id: 'd7',
    stationId: 'chatswood',
    line: 'M1',
    destination: 'Tallawong',
    platform: 1,
    minutesAway: 1,
  },
  {
    id: 'd8',
    stationId: 'blacktown',
    line: 'T1',
    destination: 'Richmond',
    platform: 4,
    minutesAway: 7,
  },
];

export const alerts: Alert[] = [
  {
    id: 'a1',
    line: 'T1',
    severity: 'warning',
    title: 'Trackwork this weekend',
    description: 'Buses replace trains between Parramatta and Blacktown on Saturday and Sunday.',
  },
  {
    id: 'a2',
    line: 'T4',
    severity: 'info',
    title: 'Lift upgrade at Central',
    description: 'Lift on platform 24 is out of service. Use the ramp at the Eddy Ave entrance.',
  },
  {
    id: 'a3',
    line: 'M1',
    severity: 'severe',
    title: 'Delays on Metro North West',
    description: 'Allow extra travel time due to an earlier signal fault.',
  },
];

export const reports: Report[] = [
  {
    id: 1041,
    stationId: 'parramatta',
    category: 'lift',
    description: 'Lift on platform 2 not working',
    status: 'open',
    createdAt: '2026-10-12T08:40:00.000Z',
  },
  {
    id: 1040,
    stationId: 'parramatta',
    category: 'cleanliness',
    description: 'Rubbish bins overflowing near the exit',
    status: 'in_progress',
    createdAt: '2026-10-11T09:15:00.000Z',
  },
  {
    id: 1039,
    stationId: 'parramatta',
    category: 'accessibility',
    description: 'Tactile strip damaged on platform 1',
    status: 'resolved',
    createdAt: '2026-10-09T07:30:00.000Z',
  },
];
