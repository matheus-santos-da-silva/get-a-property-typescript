import { User } from '../../entities/user';
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

}