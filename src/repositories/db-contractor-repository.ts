import { ContractorProps } from '../DTO/contractor.dtos';
import { PropertyProps } from '../DTO/property-dtos';
import { prismaClient } from '../database/prisma-client';
import { Contractor } from '../entities/contractor';
import { ContractorsRepository } from './contractor-repository';

export class DbContractorRepository implements ContractorsRepository {

  async create({
    id,
    name,
    phone
  }: Contractor, property: PropertyProps): Promise<void> {

    await prismaClient.contractor.create({
      data: {
        id,
        name,
        phone,
        Property: {
          connect: { id: property.id }
        }
      }
    });
  }

  async getAllContractors(): Promise<ContractorProps[]> {
    const contractors = await prismaClient.contractor.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        Property: true
      }
    });
    return contractors;
  }

  async checkIfContractorExists(name: string, phone: string): Promise<ContractorProps | null> {

    const contractor = await prismaClient.contractor.findFirst({
      where: {
        name,
        phone
      }
    });

    if (!contractor) return null;

    return contractor;
  }

  async checkIfVisitAlreadyScheduled(contractorId: string, propertyId: string): Promise<ContractorProps | null> {

    const contractor = await prismaClient.contractor.findFirst({
      where: {
        id: contractorId,
        Property: {
          some: {
            id: propertyId
          }
        }
      }
    });

    if (!contractor) return null;
    return contractor;
  }

}