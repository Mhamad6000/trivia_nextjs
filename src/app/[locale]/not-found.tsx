import { Link } from "@/i18n/routing";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white">404</h1>
        <p className="text-2xl text-white ">Oops! Page not found</p>
        <p className="text-gray-400 mt-2">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/80 transition duration-300"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
