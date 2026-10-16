import { api } from './api';
import type { NewReport, Report } from '../models/report.model';

export async function getReports(stationId: string): Promise<Report[]> {
  const res = await api.get<Report[]>('/reports', { params: { stationId } });
  return res.data;
}

export async function createReport(newReport: NewReport): Promise<Report> {
  const res = await api.post<Report>('/reports', newReport);
  return res.data;
}