import { api } from './api';
import type { Alert } from '../models/alert.model';

export async function getAlerts(): Promise<Alert[]> {
  const res = await api.get<Alert[]>('/alerts');
  return res.data;
}