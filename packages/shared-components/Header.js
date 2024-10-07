import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { HeaderButton } from './HeaderButton';
// import Logo from '../public-client/public/blogger-high-resolution-logo.png'; // Adjust path if necessary
export function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        // Here you would typically implement the actual theme switching logic
    };
    return (_jsx("header", { className: "bg-background shadow-md", children: _jsxs("div", { className: "container mx-auto px-4 py-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("img", { src: "/blogger-high-resolution-logo.png", alt: "Blogger logo", className: "h-16 max-w-full w-auto transition-transform duration-200 transform hover:scale-105" }), _jsx(HeaderButton, { href: "/", variant: "ghost", children: "Home" })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(HeaderButton, { variant: "ghost", size: "default", onClick: toggleDarkMode, "aria-label": "Toggle dark mode", children: isDarkMode ? (_jsx(Sun, { className: "h-5 w-5" })) : (_jsx(Moon, { className: "h-5 w-5" })) }), _jsx(HeaderButton, { href: "/signin", variant: "outline", children: "Sign In" }), _jsx(HeaderButton, { href: "/signup", children: "Sign Up" })] })] }) }));
}
