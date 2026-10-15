import { alerts } from '../data/seed';
import type { Alert } from '../models/alert.model';

export const alertRepository = {
  async findAll(): Promise<Alert[]> {
    return alerts;
  },
};
