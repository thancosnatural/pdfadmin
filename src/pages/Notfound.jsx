import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-6 text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-green-800 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-green-700 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 max-w-md mb-6">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
