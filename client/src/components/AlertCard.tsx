import type { Alert, AlertSeverity } from '../models/alert.model';

const severityStyles: Record<AlertSeverity, string> = {
  severe: 'border-red-500 bg-red-50 text-red-800',
  warning: 'border-amber-500 bg-amber-50 text-amber-800',
  info: 'border-blue-500 bg-blue-50 text-blue-800',
};

const severityLabels: Record<AlertSeverity, string> = {
  severe: 'Severe',
  warning: 'Warning',
  info: 'Info',
};

type AlertCardProps = {
  alert: Alert;
};

function AlertCard({ alert }: AlertCardProps) {
  return (
    <div className={`border-l-4 p-4 ${severityStyles[alert.severity]}`}>
      <p className="font-semibold">
        {severityLabels[alert.severity]} · {alert.line} · {alert.title}
      </p>
      <p className="text-sm">{alert.description}</p>
    </div>
  );
}

export default AlertCard;