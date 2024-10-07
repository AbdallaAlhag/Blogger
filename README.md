![Turbo commands](image-1.png)
![Eslint/Prettier commands](image-2.png)

First time using:
-TypeScript
-TailwindCSS (disabled tailwind fold just so i can see the css for noob like me)
-Axios
-Turborepo (monorepo)

### Todo:

    ✅❌
    ✅ Set up restore terminal on public client and server, removed sql, and commented out private client + p-studio
    ✅ Set up github
    ✅ Set up simple server and create main dashboard
    ✅ Create simple db and set up prisma
    ✅ Created task ctrl+alt+f for npm run format
    ✅ Setup prisma db, create route, controller, and query for get and post posts
    ✅ Write seed file to query db for posts with starting data
    ✅ Connect server db to front end
    ✅ Create footer and header
    ✅ Create postcard for articles in dashboard and article pages
    ✅ Style HomePage and components
    ✅ Seed test data for dashboard
    ✅ Add post loading animation
    ✅ Create individual article pages
    ✅ Work on comments section components for article pages
        ✅ Create comment MVC that attaches comments to posts id
    ❌ Link sign up and login to redirect to the private client and logout redirects to public client
        ❌ Allow users to log in and sign up
    ✅ Create auth and login/signup pages
         Implement passport to authenticate users
        ❌ Use JWT for auth
    ❌ Create Post blog page
    ❌ Allow users to edit their own posts

# Monorepop set up:

    -Installing dependencies (yarn install or npm install).
    -Running the development server (turbo run dev).
    -Building the project (turbo run build).

- Check out iconify for icons: https://iconify.design/ or reacticons
- npx kill-port 3000 to kill server if already in use
- if private build not working: "build": "vite build",
- script to remove js and d.ts from src:

  - find src -name '\*.js' -type f -delete
  - find src -name '\*.d.ts' -type f -delete

- https://picsum.photos/ cool random image generator
- https://logo.com/editor/colors logo + favicon

tailwind:

- https://flowbite.com/
- https://tailwindui.com/
- https://www.material-tailwind.com/
