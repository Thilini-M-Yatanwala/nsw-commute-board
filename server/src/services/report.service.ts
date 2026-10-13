import { reportRepository } from '../repositories/report.repository'
import type { NewReport, Report } from '../models/report.model'

export const reportService = {
  async getReports(stationId?: string): Promise<Report[]> {
    return reportRepository.findAll(stationId)
  },

  // newReport has already been checked by the validateReport middleware
  async createReport(newReport: NewReport): Promise<Report> {
    return reportRepository.create(newReport)
  },
}

/** Graphical work flow 
 POST /api/reports  { stationId, category, description }
   │
   ▼
middleware/validateReport.ts     ❌ invalid → 400 { errors }   (stops here)
   │ ✅ valid + cleaned
   ▼
route                            calls the service
   │
   ▼
services/report.service.ts       createReport(newReport)
   │
   ▼
repositories/report.repository.ts   adds id 1042, status 'open', createdAt → saves
   │
   ▼
201 { id: 1042, …, status: 'open' }  → "Thanks, your report has been sent. Reference: R-1042"
 */