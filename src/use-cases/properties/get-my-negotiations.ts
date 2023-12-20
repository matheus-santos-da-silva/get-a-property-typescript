import { PropertyProps } from '../../DTO/property-dtos';
import { Either, left, right } from '../../errors/either';
import { RequiredParametersError } from '../../errors/required-parameters-error';
import { ContractorsRepository } from '../../repositories/contractor-repository';
import { PropertiesRepository } from '../../repositories/properties-repository';

interface GetMyNegotiationsRequest {
  contractorName: string
  contractorPhone: string
} 

type GetMyNegotiationsResponse = PropertyProps[]
type Response = Either<RequiredParametersError, GetMyNegotiationsResponse>

export class GetMyNegotiations {

  constructor(
    private contractorRepository: ContractorsRepository,
    private propertyRepository: PropertiesRepository
  ) {}

  async execute({
    contractorName,
    contractorPhone
  }: GetMyNegotiationsRequest): Promise<Response> {

    const contractor = await this.contractorRepository.checkIfContractorExists(contractorName, contractorPhone);
    if(!contractor) {
      return left(new RequiredParametersError('Contractor not exists', 400));
    }
    
    const negotiations = await this.propertyRepository.getMyNegotiations(contractor.id);
    return right(negotiations);
  }
}