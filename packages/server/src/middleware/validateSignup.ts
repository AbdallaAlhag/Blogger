import { body, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const signupValidationRules: ValidationChain[] = [
  body('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email is invalid'),
  body('username')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Username is required')
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage('Username must be between 2 and 50 characters'),
  body('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8, max: 100 })
    .withMessage('Password must be between 8 and 100 characters'),
  body('confirmPassword')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Confirm password is required')
    .bail()
    .custom((value: string, { req }) => {
      return value === req.body.password;
    })
    .withMessage('Passwords do not match'),
];

const validateSignup = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  console.log(errors.array()); // Log validation errors if any
  if (!errors.isEmpty()) {
    const errorObject: { [key: string]: string } = {};
    errors.array().forEach((error) => {
      if ('path' in error) {
        errorObject[error.path] = error.msg;
      }
    });
    res.status(400).json({
      success: false,
      errors: errorObject,
    });
  }
  return next();
};

export { signupValidationRules, validateSignup };
