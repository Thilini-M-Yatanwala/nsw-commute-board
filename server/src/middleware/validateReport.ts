import type { RequestHandler } from 'express';
import { stationRepository } from '../repositories/station.repository';
import { validateReport as checkReport } from '../validation/report.validation';

export const validateReport: RequestHandler = async (req, res, next) => {
  const stations = await stationRepository.findAll('');
  const errors = checkReport(
    req.body,
    stations.map((s) => s.id),
  );

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
    return;
  }

  // Keep only the 3 allowed fields, with the description trimmed
  req.body = {
    stationId: req.body.stationId,
    category: req.body.category,
    description: req.body.description.trim(),
  };

  next();
};
