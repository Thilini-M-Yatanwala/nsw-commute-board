import type { Report, ReportStatus } from '../models/report.model';

const statusStyles: Record<ReportStatus, string> = {
  open: 'bg-amber-100 text-amber-800',
  in_progress: 'bg-blue-100 text-blue-800',
  resolved: 'bg-green-100 text-green-800',
};

const statusLabels: Record<ReportStatus, string> = {
  open: 'Open',
  in_progress: 'In progress',
  resolved: 'Resolved',
};

type ReportListProps = {
  reports: Report[];
};

function ReportList({ reports }: ReportListProps) {
  if (reports.length === 0) {
    return <p className="mt-3 text-slate-600">No reports for this station yet.</p>;
  }

  return (
    <ul className="mt-3 divide-y divide-slate-100">
      {reports.map((report) => (
        <li key={report.id} className="flex items-start justify-between gap-3 py-3">
          <div>
            <p className="text-slate-800">{report.description}</p>
            <p className="text-sm text-slate-500">
              R-{report.id} · {new Date(report.createdAt).toLocaleDateString('en-AU')}
            </p>
          </div>
          <span
            className={`shrink-0 rounded px-2 py-0.5 text-xs font-semibold ${statusStyles[report.status]}`}
          >
            {statusLabels[report.status]}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default ReportList;
