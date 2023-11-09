import { User } from '../entities/user';
import { LoginUserRequest, LoginUserResponse } from '../use-cases/login-user';

export interface UsersRepository {
  create(user: User): Promise<void>
  findEmailConflicts(email: string): Promise<User | null>
  login(props: LoginUserRequest): Promise<LoginUserResponse>
}