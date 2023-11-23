import { getAllPropertiesProps } from '../DTO/property-dtos';
import { Property } from '../entities/property';

export interface PropertiesRepository {
  create(props: Property): Promise<void>
  getAllProperties(): Promise<getAllPropertiesProps[]>
}