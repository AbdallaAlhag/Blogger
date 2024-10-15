import { Link } from 'react-router-dom';
import { Header, Footer } from '@shared';

const ErrorPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-6xl text-red-500 mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-gray-700 mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <img
          // src="https://media.giphy.com/media/3o7bu9XF8kysXSq0Ry/giphy.gif"
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3NtM2hzZjVmYnh5Nzdiem9zNDBpdjBmZGMwMWNwaHUyaThqeTEyeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TqiwHbFBaZ4ti/giphy.webp"
          alt="not found"
          className="w-full h-auto mx-auto"
          style={{ maxWidth: '500px', maxHeight: '300px', padding: '10px' }}
        />
        <Link
          to="/"
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Go Back Home
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;
