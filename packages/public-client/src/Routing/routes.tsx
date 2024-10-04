import { HomePage, ErrorPage, ArticlePage } from '../Pages';

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/article/:id',
    element: <ArticlePage />,
  },
  {
    // Catch-all route for 404 errors
    path: '*',
    element: <ErrorPage />,
  },
];

export default routes;
