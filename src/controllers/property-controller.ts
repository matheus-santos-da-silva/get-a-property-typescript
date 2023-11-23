import { Request, Response } from 'express';
import { CreateProperty, CreatePropertyRequest } from '../use-cases/properties/create-property';
import { DbPropertyRepository } from '../repositories/db-property-repository';
import { randomUUID } from 'node:crypto';
import { DbUserRepository } from '../repositories/db-user-repository';
import { getToken } from '../utils/get-token';
import { left } from '../errors/either';
import { RequiredParametersError } from '../errors/required-parameters-error';

export class PropertyController {

  static async create(request: Request<{}, {}, CreatePropertyRequest>, response: Response) {

    const {
      address,
      available,
      category,
      description,
      price,
      title,
    } = request.body;

    let images = request.files;
    if (!images) images = [];

    const repository = new DbPropertyRepository();
    const usersRepository = new DbUserRepository();
    const createProperty = new CreateProperty(repository);

    const token = getToken(request);
    if (!token) {
      return left(new RequiredParametersError('Invalid token', 401));
    }

    const user = await usersRepository.getUserByToken(token);
    if (!user) {
      return left(new RequiredParametersError('User not exists', 401));
    }

    const result = await createProperty.execute(
      {
        id: randomUUID(),
        address,
        available,
        category,
        description,
        price,
        title,
        images,
        user: { connect: { id: user.id } }
      });

    if (result.isLeft()) {
      response.status(result.value.statusCode).json(result.value.message);
      return;
    }

    response.status(201).json({ message: 'Property created successfully' });
    return;
  }

}