import { PropertyProps } from '../../DTO/property-dtos';
import { Either, left, right } from '../../errors/either';
import { RequiredParametersError } from '../../errors/required-parameters-error';
import { PropertiesRepository } from '../../repositories/properties-repository';

type GetPropertyByIdResponse = PropertyProps
type Response = Either<RequiredParametersError, GetPropertyByIdResponse>

export class GetPropertyById {

  constructor(
    private respository: PropertiesRepository
  ) { }

  async execute(id: string): Promise<Response> {

    const property = await this.respository.getPropertyById(id);

    if (!property) {
      return left(new RequiredParametersError('Property not exists', 400));
    }

    return right(property);
  }

}