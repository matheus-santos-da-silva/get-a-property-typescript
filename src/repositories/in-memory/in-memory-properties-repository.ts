import { PropertiesRepository } from '../properties-repository';
import { Property } from '../../entities/property';
import { PropertyProps, ScheduleRepositoryRequestProps } from '../../DTO/property-dtos';

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

  async getUserNegotiations(id: string): Promise<PropertyProps[]> {
    throw new Error('');
  }

}