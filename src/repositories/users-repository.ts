import { User, UserProps } from '../entities/user';
import { GetUserByIdResponse } from '../use-cases/users/get-user-by-id';

export interface UsersRepository {
  create(user: User): Promise<void>
  findUserByEmail(email: string): Promise<UserProps | null>
  findUserById(id: string): Promise<GetUserByIdResponse | null>
  getAllUsers(): Promise<Omit<UserProps, 'password'>[]>
}