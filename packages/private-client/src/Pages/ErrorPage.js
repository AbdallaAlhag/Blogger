import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
const ErrorPage = () => {
    return (_jsxs("div", { children: [_jsx("h1", { children: "Oh no, this route doesn't exist!" }), _jsx(Link, { to: "/", children: "Go Home" })] }));
};
export default ErrorPage;
