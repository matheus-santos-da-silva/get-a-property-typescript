import { Request } from 'express';

export const getToken = (request: Request): string | null => {

  const headersAuth = request.headers.authorization;
  const token = headersAuth?.split(' ')[1];

  if (!token) return null;

  return token;
};