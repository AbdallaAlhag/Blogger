import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
// import bcrypt from 'bcryptjs';
import prisma from '../db/prisma';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const JWT_SECRET = process.env.JWT_SECRET || 'a santa cat';
// Session based authentication
// passport.use(
//   new LocalStrategy(
//     { usernameField: 'username', passwordField: 'password' },
//     async (
//       username: string,
//       password: string,
//       done: (err: Error | null, user?: Express.User) => void
//     ) => {
//       try {
//         const user = await prisma.user.findUnique({ where: { username } });

//         if (!user) return done(null, false);

//         const match = await bcrypt.compare(password, user.password);

//         if (!match) return done(null, false);

//         return done(null, user);
//       } catch (err) {
//         return done(err as Error);
//       }
//     }
//   )
// );

// JWT Strategy for protected routes
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (
      jwtPayload,
      done: (error: Error | null | unknown, user: Express.User) => void
    ) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: jwtPayload.id },
        });

        if (!user) return done(null, false);

        return done(null, user);
      } catch (error: unknown) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser(
  (user: Express.User, done: (err: Error | null, id?: string) => void) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    done(null, (user as any).id); // Serialize user by ID
  }
);

passport.deserializeUser(
  async (
    id: string,
    done: (err: Error | null, user?: Express.User) => void
  ) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) return done(null, false); // If no user found

      done(null, user); // If found, pass the user to the next middleware
    } catch (err) {
      return done(err as Error);
    }
  }
);

export default passport;
