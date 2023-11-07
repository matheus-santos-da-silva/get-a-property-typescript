import { User } from '../entities/user';

export interface UsersRepository {
  create(user: User): Promise<void>
  findEmailConflicts(email: string): Promise<User | null>
}