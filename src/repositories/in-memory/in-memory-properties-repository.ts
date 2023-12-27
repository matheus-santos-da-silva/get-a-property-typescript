import { PropertiesRepository } from '../properties-repository';
import { Property } from '../../entities/property';
import { PropertyProps, ScheduleRepositoryRequestProps } from '../../DTO/property-dtos';
import { EditPropertyRequest } from '../../use-cases/properties/edit-property';

export class InMemoryPropertiesRepository implements PropertiesRepository {

  items: Property[] = [];

  async create(props: Property): Promise<void> {
    this.items.push(props);
  }

  async getAllProperties(): Promise<PropertyProps[]> {
    return this.items;
  }

  async getUserProperties(id: string): Promise<PropertyProps[]> {
    const userProperties = this.items.filter((item) => item.user.connect.id === id);

    return userProperties;
  }

  async getPropertyById(id: string): Promise<PropertyProps | null> {

    const property = this.items.find((item) => item.id === id);
    if (!property) return null;

    return property;
  }

  async schedule({
    contractor,
    owner,
    propertyId
  }: ScheduleRepositoryRequestProps): Promise<string> {
    
    const property = this.items.find((item) => item.id === propertyId);
    if(!property) {
      return 'The property not exists';
    }

    property.contractorId = contractor.id;
    return `Visit scheduled succefully, contact ${owner.name} and call ${owner.phone}`;

  }

  async getMyNegotiations(contractorId: string): Promise<PropertyProps[]> {
    const negotiations = this.items.filter((item) => item.contractorId === contractorId);
    return negotiations;
  }

  async concludeNegotiation(propertyId: string): Promise<string> {
    
    const property = this.items.find((item) => item.id === propertyId);
    if(!property) {
      return 'The property not found';
    }

    for (const item of this.items) {
      const index = this.items.findIndex((item) => item.id === propertyId);
      this.items.splice(index, 1);
    }

    return 'Negotiation completed successfully';
  }

  async checkIfAddressAlreadyExists(address: string) : Promise<PropertyProps | null> {

    const property = this.items.find((item) => item.address === address);
    if(!property) return null;

    return property;
  }

  async editProperty(id: string, props: EditPropertyRequest): Promise<void> {
  
    for (const item of this.items) {
      if (item.id === id) {
        Object.assign(item, props);
      }
    }

  }

}