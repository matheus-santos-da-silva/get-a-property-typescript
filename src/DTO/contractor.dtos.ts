import { PropertyProps } from './property-dtos';

export interface ContractorProps {
  id: string
  name: string
  phone: string,
  property?: PropertyProps[]
}

export interface ContractorPropsInMemoryRepo {
  id: string
  name: string
  phone: string
  property: PropertyProps[]
}