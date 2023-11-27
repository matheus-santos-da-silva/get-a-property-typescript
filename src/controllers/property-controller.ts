import { Request, Response } from 'express';
import { CreateProperty, CreatePropertyRequest } from '../use-cases/properties/create-property';
import { DbPropertyRepository } from '../repositories/db-property-repository';
import { randomUUID } from 'node:crypto';
import { DbUserRepository } from '../repositories/db-user-repository';
import { getToken } from '../utils/get-token';
import { left } from '../errors/either';
import { RequiredParametersError } from '../errors/required-parameters-error';
import { GetAllProperties } from '../use-cases/properties/get-all-properties';
import { GetUserProperties } from '../use-cases/properties/get-user-properties';
import { GetPropertyById } from '../use-cases/properties/get-property-by-id';

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

  static async getAllProperties(request: Request, response: Response) {

    const repository = new DbPropertyRepository();
    const getAllProperties = new GetAllProperties(repository);

    const result = await getAllProperties.execute();

    if (result.isLeft()) {
      response.status(result.value.statusCode).json(result.value.message);
      return;
    }

    response.status(201).json(result.value);
    return;
  }

  static async getUserProperties(request: Request, response: Response) {

    const id = request.params.id;

    const propertyRepository = new DbPropertyRepository();
    const userProperty = new DbUserRepository();
    const getUserProperties = new GetUserProperties(propertyRepository, userProperty);

    const result = await getUserProperties.execute(id);

    if (result.isLeft()) {
      response.status(result.value.statusCode).json(result.value.message);
      return;
    }

    response.status(200).json(result.value);
    return;
  }

  static async GetPropertyById(request: Request, response: Response) {

    const id = request.params.id;

    const respository = new DbPropertyRepository();
    const getPropertyById = new GetPropertyById(respository);

    const result = await getPropertyById.execute(id);

    if (result.isLeft()) {
      response.status(result.value.statusCode).json(result.value.message);
      return;
    }

    response.status(200).json(result.value);
    return;
  }

}