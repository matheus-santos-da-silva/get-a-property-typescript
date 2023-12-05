import { Decimal } from '@prisma/client/runtime/library';
import { ContractorProps } from './contractor.dtos';

export interface PropertyProps {
  id: string;
  category: string;
  title: string;
  address: string;
  price: Decimal;
  description: string;
  available: boolean;
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
  contractor: ContractorProps,
  owner: Owner
}