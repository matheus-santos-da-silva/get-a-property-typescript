import { PropertyProps, ScheduleRepositoryRequestProps } from '../DTO/property-dtos';
import { Property } from '../entities/property';
import { EditPropertyRequest } from '../use-cases/properties/edit-property';

export interface PropertiesRepository {
  create(props: Property): Promise<void>
  getAllProperties(): Promise<PropertyProps[]>
  getUserProperties(id: string): Promise<PropertyProps[]>
  getPropertyById(id: string): Promise<PropertyProps | null>
  getMyNegotiations(contractorId: string): Promise<PropertyProps[]>
  schedule(props: ScheduleRepositoryRequestProps): Promise<string>
  concludeNegotiation(propertyId: string): Promise<string>
  checkIfAddressAlreadyExists(address: string): Promise<PropertyProps | null>
  editProperty(id: string, props: EditPropertyRequest): Promise<void>
}