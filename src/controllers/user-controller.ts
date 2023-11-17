import { Request, Response } from 'express';
import { CreateUserRequest } from '../DTO/user-dtos';
import { DbUserRepository } from '../repositories/db-user-repository';
import { CreateUser } from '../use-cases/users/create-user';
import { randomUUID } from 'node:crypto';
import { LoginUser, LoginUserRequest } from '../use-cases/users/login-user';
import { GetUserById } from '../use-cases/users/get-user-by-id';
import { GetAllUsers } from '../use-cases/users/get-all-users';

export class UserController {

  static async register(request: Request<{}, {}, CreateUserRequest>, response: Response): Promise<void> {

    const { name, phone, email, password } = request.body;

    const repository = new DbUserRepository();
    const createUser = new CreateUser(repository);

    const result = await createUser.execute({
      id: randomUUID(),
      email,
      name,
      password,
      phone
    });

    if (result.isLeft()) {
      response.status(result.value.statusCode).json(result.value.message);
      return;
    }

    response.status(201).json({ message: 'User created successfully' });
    return;
  }

  static async login(request: Request<{}, {}, LoginUserRequest>, response: Response) {

    const { email, password } = request.body;

    const repository = new DbUserRepository();
    const loginUser = new LoginUser(repository);

    const result = await loginUser.execute({
      email,
      password
    });

    if (result.isLeft()) {
      response.status(result.value.statusCode).json(result.value.message);
      return;
    }

    response.status(200).json(result.value);
    return;
  }

  static async getUserById(request: Request, response: Response) {

    const id = request.params.id;

    const repository = new DbUserRepository();
    const getUserById = new GetUserById(repository);

    const result = await getUserById.execute(id);

    if (result.isLeft()) {
      response.status(result.value.statusCode).json(result.value.message);
      return;
    }

    response.status(200).json(result.value);
    return;
  }

  static async getAllUsers(request: Request, response: Response) {

    const repository = new DbUserRepository();
    const getAllUsers = new GetAllUsers(repository);

    const result = await getAllUsers.execute();

    response.status(200).json(result.value);
  }

}