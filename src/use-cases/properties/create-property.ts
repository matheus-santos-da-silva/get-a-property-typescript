import { Either, left, right } from '../../errors/either';
import { RequiredParametersError } from '../../errors/required-parameters-error';
import { PropertiesRepository } from '../../repositories/properties-repository';
import { Property } from '../../entities/property';
import { Decimal } from '@prisma/client/runtime/library';

export interface CreatePropertyRequest {
  id: string
  category: string
  title: string
  address: string
  price: Decimal
  description: string
  images: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] }
  user: { connect: { id: string } }
}

type CreatePropertyResponse = Property

type Response = Either<RequiredParametersError, CreatePropertyResponse>

export class CreateProperty {

  constructor(
    private repository: PropertiesRepository
  ) { }

  async execute(
    {
      id,
      address,
      category,
      description,
      images,
      price,
      title,
      user
    }: CreatePropertyRequest): Promise<Response> {

    let arrayImages: string[] = [];
    if (!images) arrayImages = [];

    if (images) {
      if (Array.isArray(images)) {
        images.map((image) => {
          arrayImages.push(image.filename);
        });
      }
    }

    const checkIfAddressAlreadyExists = await this.repository.checkIfAddressAlreadyExists(address);
    if(checkIfAddressAlreadyExists) {
      return left(new RequiredParametersError('This address is already in use', 400));
    }

    const newProperty = new Property({
      id,
      address,
      category,
      price,
      title,
      description,
      images: arrayImages,
      user,
      contractorId: null,
      id_user: user.connect.id
    });

    await this.repository.create(newProperty);
    return right(newProperty);
  }
}

