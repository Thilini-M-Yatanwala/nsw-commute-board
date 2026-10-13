import express from 'express'
import cors from 'cors'
import { stationsRouter } from './routes/stations.routes'
import { alertsRouter } from './routes/alerts.routes'
import { reportsRouter } from './routes/reports.routes'

const app = express()

// 1. Middleware for every request
app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' }))
app.use(express.json())

// 2. Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// 3. Routers
app.use('/api/stations', stationsRouter)
app.use('/api/alerts', alertsRouter)
app.use('/api/reports', reportsRouter)

// 4. Unknown API routes → JSON 404
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

export default app