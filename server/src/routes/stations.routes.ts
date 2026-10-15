import { Router } from 'express';
import { stationService } from '../services/station.service';

export const stationsRouter = Router();

// GET /api/stations?search=parra
stationsRouter.get('/', async (req, res) => {
  const search = typeof req.query.search === 'string' ? req.query.search : '';
  const stations = await stationService.searchStations(search);
  res.json(stations);
});

// GET /api/stations/parramatta
stationsRouter.get('/:id', async (req, res) => {
  const station = await stationService.getStation(req.params.id);

  if (!station) {
    res.status(404).json({ error: 'Station not found' });
    return;
  }

  res.json(station);
});

// GET /api/stations/parramatta/departures
stationsRouter.get('/:id/departures', async (req, res) => {
  const departures = await stationService.getDepartures(req.params.id);

  if (!departures) {
    res.status(404).json({ error: 'Station not found' });
    return;
  }

  res.json(departures);
});
