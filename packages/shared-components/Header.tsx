import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { HeaderButton } from './HeaderButton';
import { Link } from 'react-router-dom';
// import Logo from '../public-client/public/blogger-high-resolution-logo.png'; // Adjust path if necessary

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Here you would typically implement the actual theme switching logic
  };
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
            variant="ghost"
            size="default"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </HeaderButton>
          <HeaderButton>
            <Link to="/login">Sign In</Link>
          </HeaderButton>
          <HeaderButton>
            <Link to="/signup">Sign Up</Link>
          </HeaderButton>
        </div>
      </div>
    </header>
  );
}
