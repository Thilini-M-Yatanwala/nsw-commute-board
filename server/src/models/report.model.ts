// Part 1: allowed categories
export const REPORT_CATEGORIES = ['lift', 'cleanliness', 'safety', 'accessibility', 'other'] as const
export type ReportCategory = (typeof REPORT_CATEGORIES)[number]

// Part 2: the saved report
export type ReportStatus = 'open' | 'in_progress' | 'resolved'

export interface Report {
  id: number
  stationId: string
  category: ReportCategory
  description: string
  status: ReportStatus
  createdAt: string
}

// Part 3: what the user sends
export type NewReport = Pick<Report, 'stationId' | 'category' | 'description'>