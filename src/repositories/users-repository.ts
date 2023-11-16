import { User, UserProps } from '../entities/user';

export interface UsersRepository {
  create(user: User): Promise<void>
  findUserByEmail(email: string): Promise<UserProps | null>
}