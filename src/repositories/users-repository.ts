import { User, UserProps } from '../entities/user';
import { LoginUserRequest, LoginUserResponse } from '../use-cases/users/login-user';


export interface UsersRepository {
  create(user: User): Promise<void>
  findEmailConflicts(email: string): Promise<UserProps | null>
  login(props: LoginUserRequest): Promise<LoginUserResponse>
}