import React from "react";
import { Lock } from "lucide-react";
import { Link } from "react-router";

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white relative overflow-hidden">
      {/* Background Design: Circles */}
      <div className="absolute w-80 h-80 bg-purple-600 rounded-full opacity-20 top-10 left-10 blur-3xl"></div>
      <div className="absolute w-96 h-96 bg-pink-500 rounded-full opacity-20 bottom-10 right-10 blur-3xl"></div>

      <div className="z-10 text-center p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
        <div className="flex justify-center mb-4">
          <Lock size={64} className="text-red-500" />
        </div>
        <h1 className="text-5xl font-bold mb-4">403 Forbidden</h1>
        <p className="text-lg mb-6">
          You don’t have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-red-500 hover:bg-red-600 transition-colors duration-200 text-white font-semibold rounded-lg shadow-md"
        >
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;
