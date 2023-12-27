import { Either, left, right } from '../../errors/either';
import { RequiredParametersError } from '../../errors/required-parameters-error';
import { PropertiesRepository } from '../../repositories/properties-repository';
import { UsersRepository } from '../../repositories/users-repository';

interface DeletePropertyRequest {
  propertyId: string
  userId: string
}

type DeletePropertyResponse = {
  message: string
}

type Response = Either<RequiredParametersError, DeletePropertyResponse>

export class DeleteProperty {

  constructor(
    private propertyRepository: PropertiesRepository,
    private userRepository: UsersRepository
  ) {}

  async execute({
    propertyId, 
    userId
  }: DeletePropertyRequest):Promise<Response> {

    const user = await this.userRepository.findUserById(userId);
    if(!user) {
      return left(new RequiredParametersError('User not found', 404));
    }

    const property = await this.propertyRepository.getPropertyById(propertyId);
    if(!property) {
      return left(new RequiredParametersError('Property not found', 404));
    }

    if(user.id !== property.id_user) {
      return left(new RequiredParametersError('This property is not yours', 401));
    }

    await this.propertyRepository.deleteProperty(property.id);

    return right({ message: 'Property deleted successfully' });
  }


}