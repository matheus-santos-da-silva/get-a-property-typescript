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
  available: boolean,
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
      available,
      category,
      description,
      images,
      price,
      title,
      user
    }: CreatePropertyRequest): Promise<Response> {

    if (available === false) {
      return left(new RequiredParametersError(
        'Is not possible to create a property if the available field is false',
        400
      ));
    }

    if (!description) description = '';
    available = true;

    let arrayImages: string[] = [];
    if (!images) arrayImages = [];

    if (images) {
      if (Array.isArray(images)) {
        images.map((image) => {
          arrayImages.push(image.filename);
        });
      }
    }

    const newProperty = new Property({
      id,
      address,
      available,
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

