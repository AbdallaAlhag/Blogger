#!/bin/sh

echo "=== Vite Project Diagnostic ==="

echo "\n1. Current working directory:"
pwd

echo "\n2. List of files in current directory:"
ls -la

echo "\n3. Content of package.json:"
cat package.json

echo "\n4. Content of vite.config.js:"
cat vite.config.js

echo "\n5. List of files in src directory:"
ls -la src

echo "\n6. Content of src/Pages/ErrorPage.js:"
cat src/Pages/ErrorPage.js

echo "\n7. Searching for shared-components directory:"
find / -name "shared-components" 2>/dev/null || echo "shared-components directory not found"

echo "\n8. Node.js version:"
node --version

echo "\n9. NPM version:"
npm --version

echo "\n10. Vite version:"
npm list vite

echo "\n=== End of Diagnostic ==="