import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-4 transition-colors duration-300">
      <div className="max-w-md text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
        <AlertCircle size={64} className="mx-auto text-red-500 mb-6" />
        <h1 className="text-6xl font-extrabold text-slate-900 dark:text-white mb-2">
          404
        </h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="mb-8 text-slate-600 dark:text-slate-400 leading-relaxed">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition duration-300 shadow-lg shadow-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
