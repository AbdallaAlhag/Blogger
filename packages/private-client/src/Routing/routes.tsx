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
import EditBlogPost from '../Pages/EditBlogPage';
import ProtectedRoute from '../middleware/ProtectedRoute';

// Private pages include create-blog and edit blog are not accessible from public client and while the rest redirect back to public client
const goToPublic = (path: string) => {
  console.log(import.meta.env.VITE_PUBLIC_CLIENT_URL);
  window.location.href = `${import.meta.env.VITE_PUBLIC_CLIENT_URL}${path}`;
};

const routes = [
  {
    path: '/',
    element: <HomePage />,
    loader: () => {
      goToPublic('/');
      return null;
    },
  },
  {
    path: '/article/:id',
    element: <ArticlePage />,
    loader: ({ params }: { params: { id: string } }) => {
      goToPublic(`/article/${params.id}`);
      return null;
    },
  },
  {
    path: '/login',
    element: <LoginPage />,
    loader: () => {
      goToPublic('/login');
      return null;
    },
  },
  {
    path: '/signup',
    element: <SignUpPage />,
    loader: () => {
      goToPublic('/signup');
      return null;
    },
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
    loader: () => {
      goToPublic('/blog');
      return null;
    },
  },
  {
    path: '/edit-blog/:postId',
    element: (
      <ProtectedRoute>
        <EditBlogPost />
      </ProtectedRoute>
    ),
  },
];

export default routes;
