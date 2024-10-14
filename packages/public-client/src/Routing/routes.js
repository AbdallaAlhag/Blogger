import { jsx as _jsx } from "react/jsx-runtime";
import { HomePage, ErrorPage, ArticlePage, LoginPage, SignUpPage, BlogPage, } from '../Pages';
const routes = [
    {
        path: '/',
        element: _jsx(HomePage, {}),
    },
    {
        path: '/article/:id',
        element: _jsx(ArticlePage, {}),
    },
    {
        path: '/login',
        element: _jsx(LoginPage, {}),
    },
    {
        path: '/signup',
        element: _jsx(SignUpPage, {}),
    },
    {
        // Catch-all route for 404 errors
        path: '*',
        element: _jsx(ErrorPage, {}),
    },
    {
        path: '/blog',
        element: _jsx(BlogPage, {}),
    },
];
export default routes;
