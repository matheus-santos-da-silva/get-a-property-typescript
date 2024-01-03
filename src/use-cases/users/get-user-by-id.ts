import { Either, left, right } from '../../errors/either';
import { RequiredParametersError } from '../../errors/required-parameters-error';
import { UsersRepository } from '../../repositories/users-repository';

export type GetUserByIdResponse = {
  id: string
  name: string
  email: string
  phone: string
}

type Response = Either<RequiredParametersError, GetUserByIdResponse>

export class GetUserById {

  constructor(
    private repository: UsersRepository
  ) { }

  async execute(id: string): Promise<Response> {

    const user = await this.repository.findUserById(id);
    if (!user) {
      return left(new RequiredParametersError('User not found', 404));
    }

    return right(user);
  }

}