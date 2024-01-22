import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findUserById } from '../model/user.model';
import { TokenWithId, RequestWithUser } from '../type/user';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET) as TokenWithId;

      // Get user from the token
      (req as RequestWithUser).user = await findUserById(decoded.id);

      next();
    } catch (error) {
      res.status(401).send('Not authorized');
      return;
    }
  }

  if (!token) {
    res.status(401).send('Not authorized, no token');
    return;
  }
};
