import { Request, Response } from 'express';

export const getToken = (request: Request, response: Response): string | undefined => {

  const headersAuth = request.headers.authorization;
  const token = headersAuth?.split(' ')[1];

  if (!token) {
    response.status(401).json('Access denied');
    return; 
  }

  return token;
};