import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

export const createUserToken = (user: Omit<User, 'created_at'>): string => {

  return jwt.sign({ name: user.name, id: user.id }, String(process.env.JWT_SECRET), { expiresIn: '24h' });

};