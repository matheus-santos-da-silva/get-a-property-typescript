import { Contractor, ContractorProps } from '../entities/contractor';
import { PropertyProps } from '../DTO/property-dtos';

export interface ContractorsRepository {
  create(contractor: Contractor, property: PropertyProps): Promise<void>
  getAllContractors(): Promise<ContractorProps[]>
  checkIfVisitAlreadyScheduled(contractorId: string, propertyId: string): Promise<ContractorProps | null>
  checkIfContractorExists(name: string, phone: string): Promise<ContractorProps | null>
}