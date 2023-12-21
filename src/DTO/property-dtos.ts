import { Decimal } from '@prisma/client/runtime/library';
import { ContractorProps } from './contractor.dtos';
import { Contractor } from '../entities/contractor';

export interface PropertyProps {
  id: string;
  category: string;
  title: string;
  address: string;
  price: Decimal;
  description: string;
  images?: string[];
  id_user: string
  contractorId: string | null
}

export interface Owner {
  id: string
  name: string
  email: string
  phone: string
}

export interface ScheduleRepositoryRequestProps {
  propertyId: string
  contractor: ContractorProps | Contractor,
  owner: Owner
}