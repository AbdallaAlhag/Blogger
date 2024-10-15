import {
  HomePage,
  ErrorPage,
  ArticlePage,
  LoginPage,
  SignUpPage,
  BlogPage,
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
  {
    path: '/blog',
    element: <BlogPage />,
  },
];

export default routes;
