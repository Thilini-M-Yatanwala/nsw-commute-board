import { alertRepository } from '../repositories/alert.repository'
import type { Alert, AlertSeverity } from '../models/alert.model'

const severityOrder: Record<AlertSeverity, number> = {
  severe: 0, //We can’t sort the words alphabetically: that would give info, severe, warning, which is wrong. So we give each severity a number and sort by that.
  warning: 1,
  info: 2,
}

export const alertService = {
  async getAlerts(): Promise<Alert[]> {
    const alerts = await alertRepository.findAll()
    return [...alerts].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])
  },
}