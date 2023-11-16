import { User } from '../../entities/user';
import { Either, left, right, } from '../../errors/either';
import { RequiredParametersError } from '../../errors/required-parameters-error';
import { UsersRepository } from '../../repositories/users-repository';

interface CreateUserRequest {
  id: string
  name: string
  email: string
  phone: string
  password: string
}

type CreateUserResponse = User
type Response = Either<RequiredParametersError, CreateUserResponse>

export class CreateUser {
  constructor(
    private usersRepository: UsersRepository
  ) { }

  async execute({
    id,
    email,
    name,
    password,
    phone
  }: CreateUserRequest): Promise<Response> {

    const findUserConflictEmail = await this.usersRepository.findUserByEmail(email);

    if (findUserConflictEmail) {
      return left(new RequiredParametersError('User is already exists, please try again with another email', 400));
    }

    const user = new User({
      id,
      email,
      name,
      password,
      phone
    });

    await this.usersRepository.create(user);

    return right(user);
  }
}
