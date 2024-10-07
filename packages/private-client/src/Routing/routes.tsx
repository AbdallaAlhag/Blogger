// import { HomePage, ErrorPage, ArticlePage } from '../Pages';
//  This doesn't work at the moment? idk why vite config and tsconfig both configured
// import { HomePage, ErrorPage, ArticlePage } from '@public-client/Pages';
import {
  HomePage,
  ErrorPage,
  ArticlePage,
  LoginPage,
  SignUpPage,
} from '../../../public-client/src/Pages';

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
