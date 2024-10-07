import {
  HomePage,
  ErrorPage,
  ArticlePage,
  LoginPage,
  SignUpPage,
} from '../Pages';

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
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    // Catch-all route for 404 errors
    path: '*',
    element: <ErrorPage />,
  },
];

export default routes;
