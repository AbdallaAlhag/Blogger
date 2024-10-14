import { jsx as _jsx } from "react/jsx-runtime";
// // import { HomePage, ErrorPage, ArticlePage } from '../Pages';
// //  This doesn't work at the moment? idk why vite config and tsconfig both configured
// // import { HomePage, ErrorPage, ArticlePage } from '@public-client/Pages';
// import {
//   HomePage,
//   ErrorPage,
//   ArticlePage,
//   LoginPage,
//   SignUpPage,
//   BlogPage,
// } from '../../../public-client/src/Pages';
// import CreateBlogPost from '../Pages/CreateBlogPage';
// import EditBlogPost from '../Pages/EditBlogPage';
// import AllBlogsPage from '../Pages/AllBlogsPage';
// import ProtectedRoute from '../middleware/ProtectedRoute';
// // Private pages include create-blog and edit blog are not accessible from public client and while the rest redirect back to public client
// const goToPublic = (path: string) => {
//   console.log(import.meta.env.VITE_PUBLIC_CLIENT_URL);
//   window.location.href = `${import.meta.env.VITE_PUBLIC_CLIENT_URL}${path}`;
// };
// const routes = [
//   {
//     path: '/',
//     element: <HomePage />,
//     loader: () => {
//       goToPublic('/');
//       return null;
//     },
//   },
//   {
//     path: '/article/:id',
//     element: <ArticlePage />,
//     loader: ({ params }: { params: { id: string } }) => {
//       goToPublic(`/article/${params.id}`);
//       return null;
//     },
//   },
//   {
//     path: '/login',
//     element: <LoginPage />,
//     loader: () => {
//       goToPublic('/login');
//       return null;
//     },
//   },
//   {
//     path: '/signup',
//     element: <SignUpPage />,
//     loader: () => {
//       goToPublic('/signup');
//       return null;
//     },
//   },
//   {
//     // Catch-all route for 404 errors
//     path: '*',
//     element: <ErrorPage />,
//   },
//   {
//     path: '/create-blog',
//     element: (
//       <ProtectedRoute>
//         <CreateBlogPost />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: '/blog',
//     element: <BlogPage />,
//     loader: () => {
//       goToPublic('/blog');
//       return null;
//     },
//   },
//   {
//     path: '/edit-blog/:postId',
//     element: (
//       <ProtectedRoute>
//         <EditBlogPost />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: '/all-blogs',
//     element: (
//       <ProtectedRoute>
//         <AllBlogsPage />
//       </ProtectedRoute>
//     ),
//   },
// ];
// export default routes;
import { HomePage, ErrorPage, ArticlePage, LoginPage, SignUpPage, BlogPage, } from '../../../public-client/src/Pages';
import CreateBlogPost from '../Pages/CreateBlogPage';
import EditBlogPost from '../Pages/EditBlogPage';
import AllBlogsPage from '../Pages/AllBlogsPage';
import ProtectedRoute from '../middleware/ProtectedRoute';
// Utility to redirect to public client
const goToPublic = (path) => {
    console.log(import.meta.env.VITE_PUBLIC_CLIENT_URL);
    window.location.href = `${import.meta.env.VITE_PUBLIC_CLIENT_URL}${path}`;
};
// Loader functions
const redirectToHome = () => {
    goToPublic('/');
    return null;
};
const redirectToLogin = () => {
    goToPublic('/login');
    return null;
};
const redirectToSignup = () => {
    goToPublic('/signup');
    return null;
};
const redirectToBlog = () => {
    goToPublic('/blog');
    return null;
};
const redirectToArticle = ({ params }) => {
    if (params.id) {
        goToPublic(`/article/${params.id}`);
    }
    return null;
};
// Routes configuration
const routes = [
    {
        path: '/',
        element: _jsx(HomePage, {}),
        loader: redirectToHome,
    },
    {
        path: '/article/:id',
        element: _jsx(ArticlePage, {}),
        loader: redirectToArticle,
    },
    {
        path: '/login',
        element: _jsx(LoginPage, {}),
        loader: redirectToLogin,
    },
    {
        path: '/signup',
        element: _jsx(SignUpPage, {}),
        loader: redirectToSignup,
    },
    {
        path: '*',
        element: _jsx(ErrorPage, {}),
    },
    {
        path: '/create-blog',
        element: (_jsx(ProtectedRoute, { children: _jsx(CreateBlogPost, {}) })),
    },
    {
        path: '/blog',
        element: _jsx(BlogPage, {}),
        loader: redirectToBlog,
    },
    {
        path: '/edit-blog/:postId',
        element: (_jsx(ProtectedRoute, { children: _jsx(EditBlogPost, {}) })),
    },
    {
        path: '/all-blogs',
        element: (_jsx(ProtectedRoute, { children: _jsx(AllBlogsPage, {}) })),
    },
];
export default routes;
