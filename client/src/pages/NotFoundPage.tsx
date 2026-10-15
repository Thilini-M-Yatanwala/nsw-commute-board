import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div className="rounded-xl bg-white p-6 text-center shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Page not found</h2>
      <Link to="/" className="mt-3 inline-block text-blue-700 underline">
        Back to home
      </Link>
    </div>
  );
}

export default NotFoundPage;
