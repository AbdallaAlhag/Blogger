import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HeaderButton } from '@shared';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function SignUpPage() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear any existing errors
        if (!name || !username || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const res = await axios.post(`${baseURL}/auth/signup`, {
                username,
                name,
                email,
                password,
                confirmPassword,
            });
            console.log('Full response:', res); // Add this line
            // if (res.status === 200) {
            if (res.data && res.data.success) {
                console.log('Signed up successfully');
                navigate('/login', { replace: true });
            }
            else if (res.status === 400 && res.data.errors) {
                const errorObject = res.data.errors;
                setError(Object.values(errorObject).join(', ').replace(/,/g, ', '));
            }
            else {
                setError('Sign-up failed. Please try again. some type of bad request');
            }
        }
        catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                console.log('Error response data:', err.response.data);
                const validationErrors = err.response.data;
                console.log(validationErrors);
                if (validationErrors &&
                    typeof validationErrors === 'object' &&
                    validationErrors.errors) {
                    const errorMessages = Object.values(validationErrors.errors)
                        .map((msg) => String(msg)) // Convert `msg` to a string explicitly
                        .join('<br />'); // Join messages with a newline
                    setError(errorMessages); // Display the combined error messages
                }
                // If no specific error information is available
                else {
                    setError('Sign-up failed. Please try again. catch caught error');
                }
            }
            else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [_jsx("div", { className: "flex items-center justify-center", children: _jsx(HeaderButton, { variant: "ghost", children: _jsx(Link, { to: "/", children: _jsx("img", { src: "/blogger-high-resolution-logo.png", alt: "Blogger logo", className: "h-16 max-w-full w-auto transition-transform duration-200 transform hover:scale-105" }) }) }) }), _jsx("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900", children: "Create your account" })] }), _jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: _jsxs("div", { className: "bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10", children: [error && (_jsx("div", { className: "mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative", role: "alert", dangerouslySetInnerHTML: { __html: error } })), _jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700", children: "Full name" }), _jsx("div", { className: "mt-1", children: _jsx("input", { id: "name", name: "name", type: "text", autoComplete: "name", required: true, value: name, onChange: (e) => setName(e.target.value), className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }) })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-700", children: "Username" }), _jsx("div", { className: "mt-1", children: _jsx("input", { id: "username", name: "username", type: "text", autoComplete: "username", required: true, value: username, onChange: (e) => setUsername(e.target.value), className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }) })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Email address" }), _jsx("div", { className: "mt-1", children: _jsx("input", { id: "email", name: "email", type: "email", autoComplete: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }) })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700", children: "Password" }), _jsx("div", { className: "mt-1", children: _jsx("input", { id: "password", name: "password", type: "password", autoComplete: "new-password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }) })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirm-password", className: "block text-sm font-medium text-gray-700", children: "Confirm password" }), _jsx("div", { className: "mt-1", children: _jsx("input", { id: "confirm-password", name: "confirm-password", type: "password", autoComplete: "new-password", required: true, value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" }) })] }), _jsx("div", { children: _jsx("button", { type: "submit", className: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Sign up" }) })] }), _jsxs("div", { className: "mt-6", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-gray-300" }) }), _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "px-2 bg-white text-gray-500", children: "Already have an account?" }) })] }), _jsx("div", { className: "mt-6 text-center", children: _jsx(Link, { to: "/login", className: "font-medium text-indigo-600 hover:text-indigo-500", children: "Log in instead" }) })] })] }) })] }));
}
