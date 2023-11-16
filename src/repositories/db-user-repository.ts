import { prismaClient } from '../database/prisma-client';
import { User, UserProps } from '../entities/user';
import { encryptingPass } from '../utils/encrypt-password';
import { UsersRepository } from './users-repository';

export class DbUserRepository implements UsersRepository {

  async create(user: User): Promise<void> {
    const {
      id,
      email,
      name,
      password,
      phone
    } = user;

    const passwordHash = await encryptingPass(password);

    await prismaClient.user.create({
      data: {
        id,
        email,
        name,
        phone,
        password: passwordHash
      }
    });

  }

  async findUserByEmail(email: string): Promise<UserProps | null> {
    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) return null;
    return user;
  }

}