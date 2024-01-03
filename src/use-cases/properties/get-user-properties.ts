import { PropertyProps } from '../../DTO/property-dtos';
import { Either, left, right } from '../../errors/either';
import { RequiredParametersError } from '../../errors/required-parameters-error';
import { PropertiesRepository } from '../../repositories/properties-repository';
import { UsersRepository } from '../../repositories/users-repository';

type GetUserPropertiesResponse = PropertyProps[]
type Response = Either<RequiredParametersError, GetUserPropertiesResponse>

export class GetUserProperties {

  constructor(
    private propertyRepository: PropertiesRepository,
    private userRepository: UsersRepository
  ) { }

  async execute(id: string): Promise<Response> {

    const userExists = await this.userRepository.findUserById(id);
    if (!userExists) {
      return left(new RequiredParametersError('User not found', 404));
    }

    const result = await this.propertyRepository.getUserProperties(id);
    return right(result);
  }

}