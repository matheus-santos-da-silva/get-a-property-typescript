import { getAllUsersProps } from '../DTO/property-dtos';
import { prismaClient } from '../database/prisma-client';
import { Property } from '../entities/property';
import { PropertiesRepository } from './properties-repository';

export class DbPropertyRepository implements PropertiesRepository {
  async create({
    id,
    address,
    available,
    category,
    contractor,
    description,
    images,
    price,
    title,
    user
  }: Property): Promise<void> {

    await prismaClient.property.create({
      data: {
        id,
        address,
        available,
        category,
        contractor,
        description,
        images,
        price,
        title,
        user
      }
    });
  }

  async getAllProperties(): Promise<getAllUsersProps[]> {
    const properties = await prismaClient.property.findMany({});
    return properties;
  }

}