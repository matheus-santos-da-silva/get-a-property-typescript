import { Either, left, right } from '../../errors/either';
import { RequiredParametersError } from '../../errors/required-parameters-error';
import { UsersRepository } from '../../repositories/users-repository';
import { encryptingPass } from '../../utils/encrypt-password';

export interface EditUserRequest {
  email: string
  name: string
  phone: string
  password: string
}

interface EditUserResponse {
  message: string
}

type Response = Either<RequiredParametersError, EditUserResponse>

export class EditUser {

  constructor(
    private repository: UsersRepository
  ) { }

  async execute(
    paramId: string,
    userId: string,
    props: EditUserRequest): Promise<Response> {

    const {
      email,
      phone,
      name,
      password
    } = props;

    if(userId !== paramId) {
      return left(new RequiredParametersError('This account is not yours, please try again with your account', 400));
    }

    const userExists = await this.repository.findUserById(userId);
    if (!userExists) {
      return left(new RequiredParametersError('User not exists', 400));
    }

    const emailAlreadyExists = await this.repository.findUserByEmail(email);

    if (userExists.email !== email && emailAlreadyExists) {
      return left(new RequiredParametersError('Email is already in use, please try again with another email', 400));
    }

    const passwordHash = await encryptingPass(password);

    await this.repository.editUser(paramId, {
      email,
      name,
      phone,
      password: passwordHash
    });

    return right({ message: 'User updated successfully' });
  }

}