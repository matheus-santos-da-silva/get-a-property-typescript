import { Contractor, ContractorProps } from '../entities/contractor';
import { PropertyProps } from '../DTO/property-dtos';

export interface ContractorsRepository {
  create(contractor: Contractor, property: PropertyProps): Promise<void>
  getAllContractors(): Promise<ContractorProps[]>
  checkIfVisitAlreadyScheduled(contractorId: string, propertyId: string): Promise<ContractorProps | Contractor | null>
  checkIfContractorExists(name: string, phone: string): Promise<ContractorProps | Contractor | null>
} 