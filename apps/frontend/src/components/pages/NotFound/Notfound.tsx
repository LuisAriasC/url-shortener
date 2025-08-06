// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-red-600">404 - Not Found</h1>
      <p className="mt-4 text-lg text-gray-700">
        We couldn't find the URL you were looking for.
      </p>
      <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">
        Go back to home
      </Link>
    </div>
  );
}