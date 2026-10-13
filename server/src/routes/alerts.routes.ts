import { Router } from 'express'
import { alertService } from '../services/alert.service'

export const alertsRouter = Router()

// GET /api/alerts
alertsRouter.get('/', async (_req, res) => {
  const alerts = await alertService.getAlerts()
  res.json(alerts)
})
