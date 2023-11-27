import { PropertyProps } from '../DTO/property-dtos';
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

  async getAllProperties(): Promise<PropertyProps[]> {
    const properties = await prismaClient.property.findMany({});
    return properties;
  }

  async getUserProperties(id: string): Promise<PropertyProps[]> {

    const userProperties = (await prismaClient.property.findMany({
      where: { id_user: id }, select: {
        title: true,
        address: true,
        category: true,
        available: true,
        description: true,
        price: true,
        images: true,
        id: true,
        contractor: true
      }
    }));

    return userProperties;
  }

  async getPropertyById(id: string): Promise<PropertyProps | null> {

    const property = await prismaClient.property.findUnique({ where: { id } });

    if (!property) return null;
    return property;
  }

}