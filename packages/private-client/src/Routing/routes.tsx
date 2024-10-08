// import { HomePage, ErrorPage, ArticlePage } from '../Pages';
//  This doesn't work at the moment? idk why vite config and tsconfig both configured
// import { HomePage, ErrorPage, ArticlePage } from '@public-client/Pages';
import {
  HomePage,
  ErrorPage,
  ArticlePage,
  LoginPage,
  SignUpPage,
  BlogPage,
} from '../../../public-client/src/Pages';
import CreateBlogPost from '../Pages/CreateBlogPage';
import ProtectedRoute from '../middleware/ProtectedRoute';

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
    path: '/create-blog',
    element: (
      <ProtectedRoute>
        <CreateBlogPost />
      </ProtectedRoute>
    ),
  },
  {
    path: '/blog',
    element: <BlogPage />,
  },
];

export default routes;
