import { PropertyProps, ScheduleRepositoryRequestProps } from '../DTO/property-dtos';
import { Property } from '../entities/property';

export interface PropertiesRepository {
  create(props: Property): Promise<void>
  getAllProperties(): Promise<PropertyProps[]>
  getUserProperties(id: string): Promise<PropertyProps[]>
  getPropertyById(id: string): Promise<PropertyProps | null>
  getUserNegotiations(id: string): Promise<PropertyProps[]>
  schedule(props: ScheduleRepositoryRequestProps): Promise<string>
}