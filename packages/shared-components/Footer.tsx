import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Abdalla Alhag. All rights reserved.
        </p>
        <a
          href="https://github.com/AbdallaAlhag"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="GitHub profile"
        >
          <Github className="h-6 w-6" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
