import { Either, right } from '../../errors/either';
import { RequiredParametersError } from '../../errors/required-parameters-error';
import { UsersRepository } from '../../repositories/users-repository';

type GetAllUsersResponse = {
  id: string
  name: string
  email: string
  phone: string
}[]

type Response = Either<RequiredParametersError, GetAllUsersResponse>

export class GetAllUsers {

  constructor(

    private repository: UsersRepository

  ) { }

  async execute(): Promise<Response> {

    const users = await this.repository.getAllUsers();
    return right(users);
  }
}