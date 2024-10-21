// private site - Auth.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    // Get token from URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      // Set cookie
      Cookies.set('token', token, {
        secure: true,
        sameSite: 'None',
      });

      // Go to home page
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return <div>Loading...</div>;
}

export default Auth;
