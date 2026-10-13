import { REPORT_CATEGORIES } from '../models/report.model'
import type { NewReport, ReportCategory } from '../models/report.model'

export type ValidationErrors = Partial<Record<keyof NewReport, string>>

export function validateReport(input: unknown, stationIds: string[]): ValidationErrors {
  const errors: ValidationErrors = {}
  const data = (typeof input === 'object' && input !== null ? input : {}) as Record<string, unknown>

  // 1. Station must exist
  if (typeof data.stationId !== 'string' || !stationIds.includes(data.stationId)) {
    errors.stationId = 'Station not found'
  }

  // 2. Category must be one of the allowed values
  if (typeof data.category !== 'string' || !REPORT_CATEGORIES.includes(data.category as ReportCategory)) {
    errors.category = 'Choose a valid category'
  }

  // 3. Description must be 10–500 characters (ignoring spaces at the ends)
  const description = typeof data.description === 'string' ? data.description.trim() : ''
  if (description.length < 10) {
    errors.description = 'Description must be at least 10 characters'
  } else if (description.length > 500) {
    errors.description = 'Description must be at most 500 characters'
  }

  return errors
}