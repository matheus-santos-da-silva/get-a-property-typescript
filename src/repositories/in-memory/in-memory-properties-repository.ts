import { PropertiesRepository } from '../properties-repository';
import { Property } from '../../entities/property';

export class InMemoryPropertiesRepository implements PropertiesRepository {

  items: Property[] = [];

  async create(props: Property): Promise<void> {
    this.items.push(props);
  }

}