import express, { Router } from 'express';
import {
  // getSignupForm,
  signUp,
  // getLoginForm,
  login,
  loginAsGuest,
  logOut,
} from '../controllers/authController';
// import {
//   signupValidationRules,
//   validateSignup,
// } from '../middleware/validateSignup';

const router: Router = express.Router();

// router.get('/signup', getSignupForm);

router.post(
  '/signup',
  // signupValidationRules,
  // validateSignup,
  signUp
);

// router.get('/login', getLoginForm);

router.post('/login', login);
router.post('/login/guest', loginAsGuest);

router.get('/logout', logOut);

export default router;
