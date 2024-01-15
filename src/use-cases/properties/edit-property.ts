import { Decimal } from '@prisma/client/runtime/library';
import { PropertiesRepository } from '../../repositories/properties-repository';
import { Either, left, right } from '../../errors/either';
import { RequiredParametersError } from '../../errors/required-parameters-error';
import { categoryEnum } from '../../entities/property';

export interface EditPropertyRequest {
  title: string
  address: string
  category: categoryEnum
  description: string
  price: Decimal
  images: Express.Multer.File[]
}

interface EditPropertyResponse {
  message: string
}

type Response = Either<RequiredParametersError, EditPropertyResponse>

export class EditProperty {

  constructor(
    private propertyRepository: PropertiesRepository,
  ) {}

  async execute(
    propertyId: string,
    userId: string, {
      address,
      category,
      description,
      price,
      title,
      images
    }: EditPropertyRequest) : Promise<Response>{
      
    const property = await this.propertyRepository.getPropertyById(propertyId);
    if(!property) {
      return left(new RequiredParametersError('Property not found', 404));
    }

    if(property.id_user !== userId) {
      return left(new RequiredParametersError('This property is not yours', 401));
    }
     
    const addressAlreadyExists = await this.propertyRepository.checkIfAddressAlreadyExists(address);
    if(addressAlreadyExists) {
      return left(new RequiredParametersError('This address already exists, try again with another one', 400));
    }

    if(!(category in categoryEnum)) {
      return left(new RequiredParametersError('That category is not valid', 400));
    }

    this.propertyRepository.editProperty(
      property.id, {
        address,
        category,
        description,
        images,
        price,
        title
      }
    );

    return right({ message: 'Property updated successfully' });
  }

}