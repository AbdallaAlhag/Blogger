import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import prisma from '../db/prisma';
import { User } from '@prisma/client';

passport.use(
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    async (
      username: string,
      password: string,
      done: (err: Error | null, user?: Express.User) => void
    ) => {
      try {
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) return done(null, false);

        const match = await bcrypt.compare(password, user.password);

        if (!match) return done(null, false);

        return done(null, user);
      } catch (err) {
        return done(err as Error);
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
