import { HeaderButton } from '@shared';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Hook to programmatically navigate

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const publicURL = import.meta.env.VITE_PUBLIC_CLIENT_URL;
  const privateURL = import.meta.env.VITE_PRIVATE_CLIENT_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any existing errors

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post(`${baseURL}/auth/login`, {
        username,
        password,
      });
      if (res.status === 200) {
        const token = res.data.token;
        // localStorage.setItem('token', token);
        Cookies.set('token', token, {
          secure: true,
          sameSite: 'None',
          domain: publicURL,
        });
        Cookies.set('token', token, {
          secure: true,
          sameSite: 'None',
          domain: privateURL,
        });
        navigate('/', { replace: true });
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data.message || 'Login failed. Please try again.'
        );
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleGuestLogin = () => {
    // Here you would handle guest login logic
    // console.log('Guest login attempted');
    axios
      .post(`${baseURL}/auth/login/guest`, { username, password })
      .then((res) => {
        if (res.status === 200) {
          // Successfully logged in
          // Assuming the server returns a token in the response
          const token = res.data.token;

          // Save token to localStorage
          // localStorage.setItem('token', token); // Or use sessionStorage or cookies
          // Cookies.set('token', token, {
          //   expires: 1,
          //   sameSite: 'lax',
          //   secure: true,
          // });
          Cookies.set('token', token, {
            secure: true,
            sameSite: 'None',
            domain: publicURL,
          });
          Cookies.set('token', token, {
            secure: true,
            sameSite: 'None',
            domain: privateURL,
          });
          console.log('Cookies: ', Cookies.get('token'));
          console.log('Successfully logged in');
          navigate('/', { replace: true });
        } else {
          setError('Guest login failed. Please try again.');
          console.log('Login failed');
        }
      })
      .catch((err) => {
        console.log('Login failed', err);
        setError('Guest login failed. Please try again.');
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center">
          <HeaderButton variant="ghost">
            <Link to="/">
              <img
                src="/blogger-high-resolution-logo.png"
                alt="Blogger logo"
                className="h-16 max-w-full w-auto transition-transform duration-200 transform hover:scale-105"
              />
            </Link>
          </HeaderButton>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div
              className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <button
              onClick={handleGuestLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in as Guest
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up for an account
              </Link>
            </div>
            <div className="mt-6 text-center">
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue without an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
