import express, { Router } from 'express';
import {
  signUp,
  login,
  loginAsGuest,
  logOut,
} from '../controllers/authController';
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

router.post('/login', login);
router.post('/login/guest', loginAsGuest);

router.get('/logout', logOut);

export default router;
