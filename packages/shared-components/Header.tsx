import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { HeaderButton } from './HeaderButton';

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
          <HeaderButton href="/" asChild variant="ghost">
            <span className="text-2xl font-bold text-primary">Logo</span>
          </HeaderButton>
          <HeaderButton href="/" variant="ghost">
            Home
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
          <HeaderButton href="/signin" variant="outline">
            Sign In
          </HeaderButton>
          <HeaderButton href="/signup">Sign Up</HeaderButton>
        </div>
      </div>
    </header>
  );
}
