import { UsersRepository } from '../repositories/users-repository';

export interface LoginUserRequest {
  email: string
  password: string
}

export interface LoginUserResponse {
  message: string
  token: string
  userId: string
}

export class LoginUser {

  constructor(private repository: UsersRepository) { }

  async execute({ email, password }: LoginUserRequest): Promise<LoginUserResponse> {

    const response = await this.repository.login({ email, password });

    return {
      message: response.message,
      token: response.token,
      userId: response.userId
    };
  }

}