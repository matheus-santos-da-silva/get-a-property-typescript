import { getAllPropertiesProps } from '../../DTO/property-dtos';
import { Either, right } from '../../errors/either';
import { RequiredParametersError } from '../../errors/required-parameters-error';
import { PropertiesRepository } from '../../repositories/properties-repository';

type GetAllPropertiesResponse = getAllPropertiesProps[]
type Response = Either<RequiredParametersError, GetAllPropertiesResponse>

export class GetAllProperties {
  constructor(
    private repository: PropertiesRepository
  ) { }

  async execute(): Promise<Response> {
    const result = await this.repository.getAllProperties();
    return right(result);
  }
}