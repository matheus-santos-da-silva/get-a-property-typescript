import { PropertyProps } from '../../DTO/property-dtos';
import { Contractor, ContractorProps } from '../../entities/contractor';
import { ContractorsRepository } from '../contractor-repository';

export class InMemoryContractorsRepository implements ContractorsRepository{
    
  items: Contractor[] = [];

  async create( contractor: Contractor, property: PropertyProps): Promise<void> {
    this.items.push(contractor);
  }

  async getAllContractors(): Promise<ContractorProps[]> {
    return this.items;
  }

  async checkIfVisitAlreadyScheduled(contractorId: string, propertyId: string): Promise<Contractor | null> {
    const contractor = this.items.find((item) => item.id === contractorId);
    if(!contractor) return null;

    const alreadyExists = contractor.property?.some((property) => property.id === propertyId);
    if (alreadyExists) return null;
  
    return contractor;
  }
  
  async checkIfContractorExists(name: string, phone: string): Promise<Contractor | null> {
    const contractor = this.items.find((item) => item.name === name && item.phone === phone);
    if(!contractor) return null;

    return contractor;
  }

}