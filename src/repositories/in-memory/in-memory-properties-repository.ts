import { PropertiesRepository } from '../properties-repository';
import { Property } from '../../entities/property';
import { getAllPropertiesProps } from '../../DTO/property-dtos';

export class InMemoryPropertiesRepository implements PropertiesRepository {

  items: Property[] = [];

  async create(props: Property): Promise<void> {
    this.items.push(props);
  }

  async getAllProperties(): Promise<getAllPropertiesProps[]> {
    return this.items;
  }

}