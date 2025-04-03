import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const secretKey = process.env.JWT_SECRET || 'your-secret-key';
    if (!secretKey) {
      throw new Error('JWT secret key is not defined.');
    }
    if (!token) {
      throw new Error('Token is undefined.');
    }
    const decoded = jwt.verify(token, secretKey) as unknown as JwtPayload;
    req.user = decoded;
    next(); 
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  } 
};
