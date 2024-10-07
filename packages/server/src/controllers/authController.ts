import bcrypt from 'bcryptjs';
import passport from '../Auth/passport';
import prisma from '../db/prisma';
import { NextFunction, Request, Response } from 'express';

// export const getSignupForm = (req: Request, res: Response) => {
//   res.render('signup', { errors: {}, data: {} });
// };

// export const getLoginForm = (req: Request, res: Response) => {
//   res.render('login', { errorMessage: '' });
// };

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: 'Successfully Signed up', user });
  } catch (err) {
    next(err);
    next(err);
  }
};
// // basic login
// exports.login = (req, res, next) => {
//     passport.authenticate("local", {
//         successRedirect: "/",
//         failureRedirect: "/"
//     })(req, res, next)
//     // don't know if i need (req,res, next) but it works
// }

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    async (err: Error, user: Express.User, info: { message: string }) => {
      if (err) {
        return next(err); // If there's an internal server error
      }
      if (!user) {
        // Authentication failed, display the error message from the `info` object
        return res.render('login', { errorMessage: info.message });
      }
      req.logIn(user, async (err) => {
        if (err) {
          return next(err);
        }

        res.status(200).json({ message: 'Successfully Logged in', user });
      });
    }
  )(req, res, next);
};
export const loginAsGuest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Set guest credentials in the request body
  req.body.username = 'guest';
  req.body.password = 'guestguest';

  // Use passport's local strategy for authentication
  passport.authenticate(
    'local',
    async (err: Error, user: Express.User, info: { message: string }) => {
      if (err) {
        return next(err); // Handle internal server error
      }
      if (!user) {
        // Authentication failed, return a JSON error response
        return res.status(401).json({ error: info.message });
      }

      req.logIn(user, async (err) => {
        if (err) {
          console.error('Login error:', err); // Log any errors
          return next(err);
        }

        return res.status(200).json({ message: 'Logged in as guest' });
      });
    }
  )(req, res, next);
};

export const logOut = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(201).json({ message: 'Successfully logged out' });
  });
};
