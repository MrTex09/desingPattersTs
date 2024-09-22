
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomJwtPayload } from '../interfaces/jwtPayload';
import { CustomRequest } from '../interfaces/customRequest';

export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err || !decoded) return res.sendStatus(403);

    req.user = decoded as CustomJwtPayload; 
    next();
  });
};
