import { Either, left, right } from '../../errors/either';
import { RequiredParametersError } from '../../errors/required-parameters-error';
import { PropertiesRepository } from '../../repositories/properties-repository';
import { UsersRepository } from '../../repositories/users-repository';

export interface ConcludeNegotiationRequest {
  propertyId: string
  userId: string
}

type ConcludeNegotiationResponse = {
  message: string
}
type Response = Either<RequiredParametersError, ConcludeNegotiationResponse>

export class ConcludeNegotiation {

  constructor(
    private propertyRepository: PropertiesRepository,
    private userRepository: UsersRepository
  ) {}

  async execute({
    userId, 
    propertyId
  }: ConcludeNegotiationRequest): Promise<Response> {

    const property = await this.propertyRepository.getPropertyById(propertyId);
    if(!property) {
      return left(new RequiredParametersError('Property not found', 404));
    }

    const user = await this.userRepository.findUserById(userId);
    if(!user) { 
      return left(new RequiredParametersError('User not found', 400));
    }

    if(property.id_user !== user.id) {
      return left(new RequiredParametersError('This property is not yours', 401));
    }

    const result = await this.propertyRepository.concludeNegotiation(propertyId);
    return right({ message: result });
  }
    
}