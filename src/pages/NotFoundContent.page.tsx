import { Link } from "react-router-dom";

const NotFoundContent = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <h1 className="text-8xl font-extrabold text-red-600">404</h1>

      <h2 className="mt-6 text-3xl font-semibold text-slate-800">
        Oops! Page not found
      </h2>

      <p className="mt-4 max-w-lg text-slate-500">
        The page you are looking for might have been removed, renamed, or is
        temporarily unavailable.
      </p>

      <div className="mt-10 flex gap-4">
        <Link
          to="/"
          className="rounded bg-red-600 px-6 py-3 text-white font-semibold hover:bg-red-700"
        >
          Back to Home
        </Link>

        <Link
          to="/contact"
          className="rounded border border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-100"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default NotFoundContent;
