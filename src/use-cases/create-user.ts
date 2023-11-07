import { User } from '../entities/user';
import { UsersRepository } from '../repositories/users-repository';

interface CreateUserRequest {
  id: string
  name: string
  email: string
  phone: string
  password: string
}

type CreateUserResponse = User

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
  }: CreateUserRequest): Promise<CreateUserResponse> {

    const findUserConflictEmail = await this.usersRepository.findEmailConflicts(email);

    if (findUserConflictEmail) {
      throw new Error('Email passed already exists, please send another email');
    }

    const user = new User({
      id,
      email,
      name,
      password,
      phone
    });

    await this.usersRepository.create(user);

    return user;
  }
}
