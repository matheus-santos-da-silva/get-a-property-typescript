import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getToken } from '../utils/get-token';

export const verifyToken = (request: Request, response: Response, next: NextFunction) => {

  const token = getToken(request);

  if (!request.headers.authorization || !token) {
    response.status(401).json({ message: 'Access denied' });
    return;
  }

  try {

    verify(token, `${process.env.JWT_SECRET}`);
    next();

  } catch (error) {
    console.log(error);
    response.status(401).json({ message: 'Invalid token' });
  }

};