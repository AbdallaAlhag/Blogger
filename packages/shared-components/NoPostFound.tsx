/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import { FileX } from 'lucide-react';

const NoPostFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <FileX className="w-24 h-24 text-gray-400 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">No Post Found</h1>
      <p className="text-xl text-gray-600 mb-6">
        We couldn't find the post you're looking for.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 flex items-center"
      >
        <span className="mr-2">&#8592;</span> Go Back to Home
      </Link>
    </div>
  );
};

export default NoPostFound;
