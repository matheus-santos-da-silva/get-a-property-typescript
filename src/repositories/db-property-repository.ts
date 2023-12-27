import { PropertyProps, ScheduleRepositoryRequestProps } from '../DTO/property-dtos';
import { prismaClient } from '../database/prisma-client';
import { Property } from '../entities/property';
import { EditPropertyRequest } from '../use-cases/properties/edit-property';
import { PropertiesRepository } from './properties-repository';

export class DbPropertyRepository implements PropertiesRepository {
  async create({
    id,
    address,
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

  async schedule({
    contractor,
    owner,
    propertyId
  }: ScheduleRepositoryRequestProps): Promise<string> {
    
    await prismaClient.property.update({ where: { id: propertyId }, data: { contractorId: contractor.id } });
    return ` Visit scheduled succefully, contact ${owner.name} and call ${owner.phone} `;
  }

  async getMyNegotiations(contractorId: string): Promise<PropertyProps[] | []> {
    const negotiations = await prismaClient.property.findMany({ where: { contractorId } });
    return negotiations;
  }

  async concludeNegotiation(propertyId: string): Promise<string> {
    
    await prismaClient.property.delete({ where: { id: propertyId } });
    return 'Negotiation completed successfully';
  }

  async checkIfAddressAlreadyExists(address: string): Promise<PropertyProps | null> {
    const property = await prismaClient.property.findFirst({ where: { address } });
    if(!property) return null;
    
    return property;
  }

  async editProperty(
    id: string,
    {
      address,
      category,
      description,
      images ,
      price,
      title
    }: EditPropertyRequest): Promise<void> {
    
    await prismaClient.property.update(
      {
        where: { id },
        data: {  
          address,
          category,
          description,
          price,
          title,
          images: images.map(images => images.filename)
        } 
      }
    );

  }
  
  async deleteProperty(id: string): Promise<void> {
  
    await prismaClient.property.delete({
      where: { id }
    });

  }

}