import { User, UserProps } from '../../entities/user';
import { EditUserRequest } from '../../use-cases/users/edit-user';
import { LoginUserRequest } from '../../use-cases/users/login-user';
import { UsersRepository } from '../users-repository';

export class InMemoryUsersRepository implements UsersRepository {

  items: User[] = [];

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const userWithEmailConflict = this.items.find((items) => items.email === email);

    if (!userWithEmailConflict) return null;
    return userWithEmailConflict;
  }

  async login({ email, password }: LoginUserRequest): Promise<UserProps | null> {

    const user = this.items.find((items) => items.email === email && items.password === password);
    if (!user) return null;

    return user;
  }

  async findUserById(id: string): Promise<UserProps | null> {

    const user = this.items.find((items) => items.id === id);
    if (!user) return null;

    return user;
  }

  async getAllUsers(): Promise<UserProps[]> {
    return this.items;
  }

  async editUser(id: string, props: EditUserRequest): Promise<void> {

    for (const user of this.items) {
      if (user.id === id) {
        Object.assign(user, props);
      }
    }
  }
}