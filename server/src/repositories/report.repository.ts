import { reports } from '../data/seed';
import type { NewReport, Report } from '../models/report.model';

let nextId = Math.max(...reports.map((r) => r.id)) + 1;

export const reportRepository = {
  async findAll(stationId?: string): Promise<Report[]> {
    const result = stationId ? reports.filter((r) => r.stationId === stationId) : reports;
    return [...result].sort((a, b) => b.createdAt.localeCompare(a.createdAt)); // Compare two dates (as text). b before a = newest first (descending)
  },

  async create(newReport: NewReport): Promise<Report> {
    const report: Report = {
      id: nextId++,
      ...newReport, // // copy stationId, category, description
      status: 'open', // // every new report starts open
      createdAt: new Date().toISOString(), //// right now, e.g. '2026-10-13T09:12:05.123Z'
    };
    reports.push(report); // add it to the list
    return report; // // send it back (with its new id)
  },
};

// note
/**
 * Memory only: new reports live in the reports array only while the server runs. Restart it and they’re gone
 * db integration will fix this
 */
