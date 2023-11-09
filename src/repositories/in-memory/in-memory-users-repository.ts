import { User } from '../../entities/user';
import { LoginUserRequest, LoginUserResponse } from '../../use-cases/login-user';
import { UsersRepository } from '../users-repository';

export class InMemoryUsersRepository implements UsersRepository {

  items: User[] = [];

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async findEmailConflicts(email: string): Promise<User | null> {
    const userWithEmailConflict = this.items.find((items) => items.email === email);

    if (!userWithEmailConflict) return null;
    return userWithEmailConflict;
  }

  async login({ email, password }: LoginUserRequest): Promise<LoginUserResponse> {

    const user = this.items.find((items) => items.email === email && items.password === password);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      message: 'User logged successfully',
      token: 'test',
      userId: user.id
    };
  }
}