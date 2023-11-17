import { compare } from 'bcrypt';
import { Either, left, right } from '../../errors/either';
import { RequiredParametersError } from '../../errors/required-parameters-error';
import { UsersRepository } from '../../repositories/users-repository';
import { createUserToken } from '../../utils/create-user-token';

export interface LoginUserRequest {
  email: string
  password: string
}

export interface LoginUserResponse {
  message: string
  token: string
  userId: string
}

export type Response = Either<RequiredParametersError, LoginUserResponse>

export class LoginUser {

  constructor(
    private repository: UsersRepository
  ) { }

  async execute({
    email,
    password
  }: LoginUserRequest): Promise<Response> {

    const user = await this.repository.findUserByEmail(email);

    if (!user) {
      return left(new RequiredParametersError('User not exists', 401));
    }

    const checkPassword = compare(password, user.password);
    if (!checkPassword) {
      return left(new RequiredParametersError('Wrong password', 401));
    }

    const { token } = createUserToken(user);

    return right({
      message: 'You are logged!',
      token,
      userId: user.id
    });
  }
}