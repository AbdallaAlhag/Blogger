
// export default routes;
import {
  HomePage,
  ErrorPage,
  ArticlePage,
  LoginPage,
  SignUpPage,
  BlogPage,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
} from '@public-client';
import CreateBlogPost from '../Pages/CreateBlogPage';
import EditBlogPost from '../Pages/EditBlogPage';
import AllBlogsPage from '../Pages/AllBlogsPage';
import ProtectedRoute from '../middleware/ProtectedRoute';
import { Params, LoaderFunction } from 'react-router-dom';

// Utility to redirect to public client
const goToPublic = (path: string) => {
  console.log(import.meta.env.VITE_PUBLIC_CLIENT_URL);
  window.location.href = `${import.meta.env.VITE_PUBLIC_CLIENT_URL}${path}`;
};

// Loader functions
const redirectToHome: LoaderFunction = () => {
  goToPublic('/');
  return null;
};

const redirectToLogin: LoaderFunction = () => {
  goToPublic('/login');
  return null;
};

const redirectToSignup: LoaderFunction = () => {
  goToPublic('/signup');
  return null;
};

const redirectToBlog: LoaderFunction = () => {
  goToPublic('/blog');
  return null;
};

const redirectToArticle: LoaderFunction = ({ params }: { params: Params }) => {
  if (params.id) {
    goToPublic(`/article/${params.id}`);
  }
  return null;
};

// Routes configuration
const routes = [
  {
    path: '/',
    element: <HomePage />,
    loader: redirectToHome,
  },
  {
    path: '/article/:id',
    element: <ArticlePage />,
    loader: redirectToArticle,
  },
  {
    path: '/login',
    element: <LoginPage />,
    loader: redirectToLogin,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
    loader: redirectToSignup,
  },
  {
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
    loader: redirectToBlog,
  },
  {
    path: '/edit-blog/:postId',
    element: (
      <ProtectedRoute>
        <EditBlogPost />
      </ProtectedRoute>
    ),
  },
  {
    path: '/all-blogs',
    element: (
      <ProtectedRoute>
        <AllBlogsPage />
      </ProtectedRoute>
    ),
  },
];

export default routes;
