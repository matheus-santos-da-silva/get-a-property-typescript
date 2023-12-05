import { UserProps } from '../../entities/user';
import { PropertiesRepository } from '../../repositories/properties-repository';
import { Either, left, right } from '../../errors/either';
import { RequiredParametersError } from '../../errors/required-parameters-error';
import { ContractorsRepository } from '../../repositories/contractor-repository';
import { UsersRepository } from '../../repositories/users-repository';
import { randomUUID } from 'node:crypto';
import { Contractor } from '../../entities/contractor';

export interface ScheduleRequest {
  propertyId: string
  user: UserProps
}

type ScheduleResponse = string

type Response = Either<RequiredParametersError, ScheduleResponse>

export class Schedule {

  constructor(
    private propertyRepository: PropertiesRepository,
    private userRepository: UsersRepository,
    private contractorRepository: ContractorsRepository
  ) { }

  async execute(props: ScheduleRequest): Promise<Response> {

    const { propertyId, user } = props;
    const { propertyRepository, userRepository, contractorRepository } = this;

    const property = await propertyRepository.getPropertyById(propertyId);
    if (!property) {
      return left(new RequiredParametersError('This property not exists', 400));
    }

    if (property.id_user === user.id) {
      return left(new RequiredParametersError('You can not schedule a visit to your own property', 400));
    }

    const owner = await userRepository.findUserById(property.id_user);
    if (!owner) {
      return left(new RequiredParametersError('The owner of this property does not exist', 400));
    }

    const contractor = new Contractor({
      id: randomUUID(),
      name: user.name,
      phone: user.phone
    });

    const contractorExists = await contractorRepository.checkIfContractorExists(contractor.name, contractor.phone);

    if (contractorExists) {
      const check = await contractorRepository.checkIfVisitAlreadyScheduled(contractorExists.id, property.id);

      if (check) {
        return left(new RequiredParametersError('You already scheduled visit to this property', 400));
      }

      const result = await propertyRepository.schedule({ contractor: contractorExists, owner, propertyId });
      return right(result);
    }

    await contractorRepository.create(contractor, property);

    const result = await propertyRepository.schedule({ contractor, owner, propertyId });
    return right(result);
  }

}