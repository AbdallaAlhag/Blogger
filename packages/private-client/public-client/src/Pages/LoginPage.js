import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HeaderButton } from '@shared';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook to programmatically navigate
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const handleSubmit = async (e) => {
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
                Cookies.set('token', token, { expires: 1 });
                navigate('/', { replace: true });
            }
            else {
                setError('Login failed. Please try again.');
            }
        }
        catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'Login failed. Please try again.');
            }
            else {
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
                Cookies.set('token', token, { expires: 1 });
                console.log('Successfully logged in');
                navigate('/', { replace: true });
            }
            else {
                setError('Guest login failed. Please try again.');
                console.log('Login failed');
            }
        })
            .catch((err) => {
            console.log('Login failed', err);
            setError('Guest login failed. Please try again.');
        });
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [_jsx("div", { className: "flex items-center justify-center", children: _jsx(HeaderButton, { variant: "ghost", children: _jsx(Link, { to: "/", children: _jsx("img", { src: "/blogger-high-resolution-logo.png", alt: "Blogger logo", className: "h-16 max-w-full w-auto transition-transform duration-200 transform hover:scale-105" }) }) }) }), _jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Log in to your account" })] }), _jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: _jsxs("div", { className: "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10", children: [error && (_jsx("div", { className: "mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative", role: "alert", children: _jsx("span", { className: "block sm:inline", children: error }) })), _jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-700", children: "Username" }), _jsx("div", { className: "mt-1", children: _jsx("input", { id: "username", name: "username", type: "username", autoComplete: "username", required: true, value: username, onChange: (e) => setUsername(e.target.value), className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }) })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Password" }), _jsx("div", { className: "mt-1", children: _jsx("input", { id: "password", name: "password", type: "password", autoComplete: "current-password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }) })] }), _jsx("div", { children: _jsx("button", { type: "submit", className: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Log in" }) })] }), _jsx("div", { className: "mt-6", children: _jsx("button", { onClick: handleGuestLogin, className: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Log in as Guest" }) }), _jsxs("div", { className: "mt-6", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-gray-300" }) }), _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "px-2 bg-white text-gray-500", children: "Or" }) })] }), _jsx("div", { className: "mt-6 text-center", children: _jsx(Link, { to: "/signup", className: "font-medium text-indigo-600 hover:text-indigo-500", children: "Sign up for an account" }) }), _jsx("div", { className: "mt-6 text-center", children: _jsx(Link, { to: "/", className: "font-medium text-indigo-600 hover:text-indigo-500", children: "Continue without an account" }) })] })] }) })] }));
}
