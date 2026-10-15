import { Router } from 'express';
import { reportService } from '../services/report.service';
import { validateReport } from '../middleware/validateReport';

export const reportsRouter = Router();

// GET /api/reports?stationId=parramatta
reportsRouter.get('/', async (req, res) => {
  const stationId = typeof req.query.stationId === 'string' ? req.query.stationId : undefined;
  const reports = await reportService.getReports(stationId);
  res.json(reports);
});

// POST /api/reports
reportsRouter.post('/', validateReport, async (req, res) => {
  const report = await reportService.createReport(req.body);
  res.status(201).json(report);
});
