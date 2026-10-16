import { useEffect, useState } from 'react';
import type { SubmitEvent } from 'react';
import { Link, useParams } from 'react-router';
import { isAxiosError } from 'axios';
import { getStation } from '../services/station.service';
import { createReport } from '../services/report.service';
import { REPORT_CATEGORIES } from '../models/report.model';
import type { NewReport, Report, ReportCategory } from '../models/report.model';

const categoryLabels: Record<ReportCategory, string> = {
  lift: 'Lift / escalator',
  cleanliness: 'Cleanliness',
  safety: 'Safety',
  accessibility: 'Accessibility',
  other: 'Other',
};

type FieldErrors = Partial<Record<keyof NewReport, string>>;

const MAX_LENGTH = 500;

function ReportPage() {
  const { id = '' } = useParams<{ id: string }>();
  const [stationName, setStationName] = useState(id);

  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState<Report | null>(null);

  useEffect(() => {
    getStation(id)
      .then((station) => setStationName(station.name))
      .catch(() => {});
  }, [id]);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    setServerError(null);

    try {
      const report = await createReport({
        stationId: id,
        category: category as ReportCategory,
        description,
      });
      setCreated(report);
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 400) {
        setErrors(err.response.data.errors ?? {});
      } else {
        setServerError("Couldn't send your report. Try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setCreated(null);
    setCategory('');
    setDescription('');
  }

  if (created) {
    return (
      <div className="rounded-xl bg-white p-6 text-center shadow-sm" role="status">
        <p className="text-3xl" aria-hidden="true">
          ✅
        </p>
        <h2 className="mt-2 text-lg font-semibold text-slate-800">
          Thanks, your report has been sent
        </h2>
        <p className="mt-1 text-slate-600">
          Reference R-{created.id} · {categoryLabels[created.category]} at {stationName}
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Link to={`/station/${id}`} className="rounded-lg border border-slate-300 px-4 py-2">
            Back to {stationName}
          </Link>
          <button onClick={reset} className="rounded-lg border border-slate-300 px-4 py-2">
            Report another issue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <Link to={`/station/${id}`} className="text-sm text-blue-700 underline">
        ← Back to {stationName}
      </Link>
      <h2 className="mt-2 text-lg font-semibold text-slate-800">
        Report an issue at {stationName}
      </h2>
      <p className="text-slate-600">
        Your report goes to station staff. You don't need to give your name.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-invalid={!!errors.category}
            aria-describedby={errors.category ? 'category-error' : undefined}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="">Choose a category</option>
            {REPORT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {categoryLabels[c]}
              </option>
            ))}
          </select>
          {errors.category && (
            <p id="category-error" className="mt-1 text-sm text-red-700">
              {errors.category}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">
            What's the problem?
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={MAX_LENGTH}
            rows={4}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'description-error' : undefined}
            placeholder="Lift on platform 2 not working since this morning"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <div className="mt-1 flex justify-between text-sm">
            <span id="description-error" className="text-red-700">
              {errors.description}
            </span>
            <span className="text-slate-500">
              {description.length} / {MAX_LENGTH}
            </span>
          </div>
        </div>

        {serverError && (
          <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-800">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 disabled:opacity-60"
        >
          {submitting ? 'Sending…' : 'Submit report'}
        </button>
      </form>
    </div>
  );
}

export default ReportPage;
