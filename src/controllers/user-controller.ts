/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from 'express';
import { CreateUserRequest } from '../DTO/user-dtos';
import { DbUserRepository } from '../repositories/db-user-repository';
import { CreateUser } from '../use-cases/users/create-user';
import { randomUUID } from 'node:crypto';

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
      response.status(result.value.statusCode).json(result);
      return;
    }

    response.status(201).json({ message: 'User created successfully' });
    return;
  }
}