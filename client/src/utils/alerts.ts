import type { Alert } from '../models/alert.model';

export function alertsForLines(alerts: Alert[], lines: string[]): Alert[] {
  return alerts.filter((alert) => lines.includes(alert.line));
}