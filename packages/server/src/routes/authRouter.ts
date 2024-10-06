import express, { Router } from 'express';
import authController from '../controllers/authController';
import {
  signupValidationRules,
  validateSignup,
} from '../middleware/validateSignup';

const router: Router = express.Router();

router.get('/signup', authController.getSignupForm);
router.post(
  '/signup',
  signupValidationRules,
  validateSignup,
  authController.signUp
);

router.get('/login', authController.getLoginForm);
router.post('/login', authController.login);
router.post('/login/guest', authController.loginAsGuest);

router.get('/logout', authController.logOut);

export default router;
