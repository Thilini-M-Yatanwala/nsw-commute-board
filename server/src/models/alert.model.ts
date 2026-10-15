export type AlertSeverity = 'info' | 'warning' | 'severe';

export interface Alert {
  id: string;
  line: string;
  severity: AlertSeverity;
  title: string;
  description: string;
}
