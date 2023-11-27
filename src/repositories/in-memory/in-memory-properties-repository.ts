import { PropertiesRepository } from '../properties-repository';
import { Property } from '../../entities/property';
import { getAllPropertiesProps } from '../../DTO/property-dtos';
import { User } from '@prisma/client';
import { UsersRepository } from '../users-repository';

export class InMemoryPropertiesRepository implements PropertiesRepository {

  items: Property[] = [];

  async create(props: Property): Promise<void> {
    this.items.push(props);
  }

  async getAllProperties(): Promise<getAllPropertiesProps[]> {
    return this.items;
  }

  async getUserProperties(id: string): Promise<getAllPropertiesProps[]> {
    const userProperties = this.items.filter((items) => items.user.connect.id === id);

    return userProperties;
  }

}