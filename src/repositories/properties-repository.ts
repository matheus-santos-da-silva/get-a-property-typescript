import { Property } from '../entities/property';

export interface PropertiesRepository {
  create(props: Property): Promise<void>
}