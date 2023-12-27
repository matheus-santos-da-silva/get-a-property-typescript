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
import { Schedule } from '../use-cases/properties/schedule';
import { DbContractorRepository } from '../repositories/db-contractor-repository';
import { CreatePropertyValidation } from '../utils/create-property-validation';
import { GetMyNegotiations } from '../use-cases/properties/get-my-negotiations';
import { ConcludeNegotiation } from '../use-cases/properties/conclude-negotiation';
import { EditProperty, EditPropertyRequest } from '../use-cases/properties/edit-property';

export class PropertyController {

  static async create(request: Request<{}, {}, CreatePropertyRequest>, response: Response) {

    const {
      address,
      category,
      description,
      price,
      title,
    } = request.body;

    const validationRequest = CreatePropertyValidation(request);
    if (!validationRequest.isValid) {
      response.status(422).json({ message: validationRequest.message });
      return;
    }
    
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

  static async Schedule(request: Request, response: Response) {

    const id = request.params.id;

    const token = getToken(request);
    if (!token) {
      return left(new RequiredParametersError('Token not found', 400));
    }

    const userRepository = new DbUserRepository();

    const user = await userRepository.getUserByToken(token);
    if (!user) {
      return left(new RequiredParametersError('User not found', 400));
    }

    const propertyRepository = new DbPropertyRepository();
    const contractorRepository = new DbContractorRepository();

    const schedule = new Schedule(propertyRepository, userRepository, contractorRepository);

    const result = await schedule.execute({ propertyId: id, user });

    if (result.isLeft()) {
      response.status(result.value.statusCode).json(result.value.message);
      return;
    }

    response.status(200).json(result.value);
    return;
  }

  static async getMyNegotiations(request: Request, response: Response) {

    const token = getToken(request);
    if (!token) {
      return left(new RequiredParametersError('Token not found', 400));
    }

    const userRepository = new DbUserRepository();

    const user = await userRepository.getUserByToken(token);
    if (!user) {
      return left(new RequiredParametersError('User not found', 400));
    }

    const propertyRepository = new DbPropertyRepository();
    const contractorRepository = new DbContractorRepository();

    const getMyNegotiations = new GetMyNegotiations(contractorRepository, propertyRepository);
    const result = await getMyNegotiations.execute({ contractorName: user.name, contractorPhone: user.phone });

    if (result.isLeft()) {
      response.status(result.value.statusCode).json(result.value.message);
      return;
    }

    response.status(200).json(result.value);
    return;
  }

  static async ConcludeNegotiation(request: Request, response: Response) {

    const id = request.params.id;

    const token = getToken(request);
    if (!token) {
      return left(new RequiredParametersError('Token not found', 401));
    }
    
    const propertyRepository = new DbPropertyRepository();

    const userRepository = new DbUserRepository();
    const user = await userRepository.getUserByToken(token);

    if (!user) {
      return left(new RequiredParametersError('User not found', 404));
    }

    const concludeNegotiation = new ConcludeNegotiation(propertyRepository, userRepository);
    const result = await concludeNegotiation.execute({
      propertyId: id,
      userId: user.id
    });

    if (result.isLeft()) {
      response.status(result.value.statusCode).json(result.value.message);
      return;
    }

    response.status(200).json(result.value);
    return;

  }

  static async editProperty(request: Request<{ id: string }, {}, EditPropertyRequest>, response: Response) {
    const { 
      address,
      category,
      description,
      price,
      title
    } = request.body;

    const validationRequest = CreatePropertyValidation(request);
    if (!validationRequest.isValid) {
      response.status(422).json({ message: validationRequest.message });
      return;
    }
    const id = request.params.id;

    let images = request.files as Express.Multer.File[];
    if (!images) images = [];

    const token = getToken(request);
    if (!token) {
      return left(new RequiredParametersError('Token not found', 401));
    }

    const propertyRepository = new DbPropertyRepository();

    const userRepository = new DbUserRepository();
    const user = await userRepository.getUserByToken(token);
    if (!user) {
      return left(new RequiredParametersError('User not found', 404));
    }

    const editProperty = new EditProperty(propertyRepository);
    const result = await editProperty.execute(
      id,
      user.id,
      {
        address,
        category,
        description,
        price,
        title,
        images
      }
    );

    if (result.isLeft()) {
      response.status(result.value.statusCode).json(result.value.message);
      return;
    }

    response.status(200).json(result.value);
    return;

  }

}