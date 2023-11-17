import { prismaClient } from '../database/prisma-client';
import { User, UserProps } from '../entities/user';
import { GetUserByIdResponse } from '../use-cases/users/get-user-by-id';
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

  async findUserById(id: string): Promise<GetUserByIdResponse | null> {

    const user = await prismaClient.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        Property: true
      }
    });

    if (!user) return null;

    return user;
  }

  async getAllUsers(): Promise<Omit<UserProps, 'password'>[]> {

    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        Property: true,
        created_at: true,
      }
    });
    return users;
  }
}