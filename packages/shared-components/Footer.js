import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Github } from 'lucide-react';
const Footer = () => {
    return (_jsx("footer", { className: "bg-background border-t", children: _jsxs("div", { className: "container mx-auto px-4 py-6 flex items-center justify-between", children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: ["\u00A9 ", new Date().getFullYear(), " Abdalla Alhag. All rights reserved."] }), _jsx("a", { href: "https://github.com/AbdallaAlhag", target: "_blank", rel: "noopener noreferrer", className: "text-muted-foreground hover:text-primary transition-colors", "aria-label": "GitHub profile", children: _jsx(Github, { className: "h-6 w-6" }) })] }) }));
};
export default Footer;
