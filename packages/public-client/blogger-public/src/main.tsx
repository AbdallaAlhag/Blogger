import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
// import HomePage from './Pages/HomePage';
import routes from './Routing/routes';
const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <HomePage /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
