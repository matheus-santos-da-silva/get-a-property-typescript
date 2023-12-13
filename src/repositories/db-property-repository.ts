import { PropertyProps, ScheduleRepositoryRequestProps } from '../DTO/property-dtos';
import { prismaClient } from '../database/prisma-client';
import { Property } from '../entities/property';
import { PropertiesRepository } from './properties-repository';

export class DbPropertyRepository implements PropertiesRepository {
  async create({
    id,
    address,
    available,
    category,
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
        contractor: true,
        id_user: true,
        contractorId: true
      }
    }));

    return userProperties;
  }

  async getPropertyById(id: string): Promise<PropertyProps | null> {

    const property = await prismaClient.property.findUnique({ where: { id } });

    if (!property) return null;
    return property;
  }

  async getUserNegotiations(id: string): Promise<PropertyProps[]> {
    const negotiations = await prismaClient.property.findMany({});
    return negotiations;
  }

  async schedule({
    contractor,
    owner,
    propertyId
  }: ScheduleRepositoryRequestProps): Promise<string> {
    
    await prismaClient.property.update({ where: { id: propertyId }, data: { contractorId: contractor.id } });
    return ` Visit scheduled with succefully, contact ${owner.name} and call to ${owner.phone} `;
  }

}