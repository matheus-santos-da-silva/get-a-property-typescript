import { PropertiesRepository } from '../properties-repository';
import { Property } from '../../entities/property';
import { PropertyProps } from '../../DTO/property-dtos';

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

}