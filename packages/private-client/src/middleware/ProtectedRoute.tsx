/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  // const token = localStorage.getItem('token'); // Check JWT token
  // const token = Cookies.get('token'); // Get the token from cookies
  const isAuthenticated = () => !!Cookies.get('token'); //

  // // console.log('token is: ', token);
  // useEffect(() => {
  //   // if (!token) {
  //   if (!isAuthenticated()) {
  //     navigate('/login'); // Redirect to login if not authenticated
  //   }
  // }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
