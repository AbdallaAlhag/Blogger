import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  // const token = localStorage.getItem('token'); // Check JWT token
  const token = Cookies.get('token'); // Get the token from cookies

  console.log(token);
  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate, token]);

  return <>{children}</>;
};

export default ProtectedRoute;
