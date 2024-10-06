import { jsx as _jsx } from "react/jsx-runtime";
import { HomePage, ErrorPage, ArticlePage } from '../Pages';
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
        // Catch-all route for 404 errors
        path: '*',
        element: _jsx(ErrorPage, {}),
    },
];
export default routes;
