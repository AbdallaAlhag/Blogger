import HomePage from '../Pages';
import ErrorPage from './ErrorPage';

const routes = [
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
