import express, { Router, Request, Response, NextFunction } from 'express';
import { signUp, login, loginAsGuest } from '../controllers/authController';
// import {
//   signupValidationRules,
//   validateSignup,
// } from '../middleware/validateSignup';

const router: Router = express.Router();

router.post(
  '/signup',
  // signupValidationRules,
  // validateSignup,
  signUp
);

// router.post('/login', login);
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  login(req, res, next);
});

router.post('/login/guest', loginAsGuest);

// router.get('/logout', logOut);

export default router;

// in case of type error:
// router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
//   signUp(req, res, next);
// });

// router.post('/login', (req: Request, res: Response, next: NextFunction) => {
//   login(req, res, next);
// });

// router.post('/login/guest', (req: Request, res: Response, next: NextFunction) => {
//   loginAsGuest(req, res, next);
// });

// router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
//   logOut(req, res, next);
// });
