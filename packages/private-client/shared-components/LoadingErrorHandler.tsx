import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '@shared';

interface LoadingErrorHandlerProps {
  isLoading: boolean;
  error: string | null;
  children: React.ReactNode;
}

const LoadingErrorHandler: React.FC<LoadingErrorHandlerProps> = ({
  isLoading,
  error,
  children,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center bg-gray-100">
          <h1 className="text-6xl text-red-500 mb-4">
            Oops! An Error Occurred
          </h1>
          <p className="text-xl text-gray-700 mb-6">{error}</p>
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3NtM2hzZjVmYnh5Nzdiem9zNDBpdjBmZGMwMWNwaHUyaThqeTEyeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TqiwHbFBaZ4ti/giphy.webp"
            alt="error"
            className="w-full h-auto mx-auto mb-6"
            style={{ maxWidth: '500px', maxHeight: '300px' }}
          />
          <Link
            to="/"
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            Go Back Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingErrorHandler;
