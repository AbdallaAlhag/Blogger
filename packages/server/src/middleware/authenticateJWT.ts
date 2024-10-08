import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'a santa cat';

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' s')[1]; // Extract the token from "Bearer <token>"

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden, invalid token' });
      }
      // Attach user information to request object
      req.user = user;
      next(); // Continue to the protected route
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }
};
