import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

interface CreateUserTokenResponse {
  token: string
  userId: string
}

export const createUserToken = (user: Omit<User, 'created_at'>): CreateUserTokenResponse => {

  const token = sign({
    name: user.name,
    id: user.id
  }, String(process.env.JWT_SECRET), { expiresIn: '24h' });

  return {
    token: token,
    userId: user.id
  };

};