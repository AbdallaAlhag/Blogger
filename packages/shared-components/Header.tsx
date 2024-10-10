import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderButton } from './HeaderButton';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export function Header() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();

  // const isAuthenticated = () => !!localStorage.getItem('token'); // returns true if token exists
  const isAuthenticated = () => !!Cookies.get('token'); // returns true if token exists
  useEffect(() => {
    setIsUserLoggedIn(isAuthenticated());
  }, []);

  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="/blogger-high-resolution-logo.png"
            alt="Blogger logo"
            className="h-16 max-w-full w-auto transition-transform duration-200 transform hover:scale-105"
          />
          <HeaderButton variant="ghost">
            <Link to="/">Home</Link>
          </HeaderButton>
        </div>
        <div className="flex items-center space-x-4">
          <HeaderButton
            onClick={() => {
              navigate('/blog');
            }}
          >
            All Blogs
          </HeaderButton>
          <HeaderButton
            onClick={() => {
              if (isUserLoggedIn) {
                window.location.href = `${import.meta.env.VITE_PRIVATE_CLIENT_URL}/create-blog`;
              } else {
                navigate('/login', { replace: true });
              }
              // navigate('/create-blog', { replace: true });
            }}
          >
            Create Blog
          </HeaderButton>
          {isUserLoggedIn ? (
            <HeaderButton
              onClick={() => {
                // localStorage.removeItem('token');
                Cookies.remove('token');
                setIsUserLoggedIn(false);
                navigate('/login', { replace: true });
              }}
            >
              Logout
            </HeaderButton>
          ) : (
            <>
              <HeaderButton>
                <Link to="/login">Sign In</Link>
              </HeaderButton>
              <HeaderButton>
                <Link to="/signup">Sign Up</Link>
              </HeaderButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
