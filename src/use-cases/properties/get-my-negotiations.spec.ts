import { describe, expect, it } from 'vitest';
import { InMemoryContractorsRepository } from '../../repositories/in-memory/in-memory-contractors-repository';
import { GetMyNegotiations } from './get-my-negotiations';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { InMemoryPropertiesRepository } from '../../repositories/in-memory/in-memory-properties-repository';
import { CreateUser } from '../users/create-user';
import { CreateProperty } from './create-property';
import { mockProperty1, mockUser, mockUser1 } from '../../mocks/mocks';
import { Schedule } from './schedule';
import { RequiredParametersError } from '../../errors/required-parameters-error';

describe('GetMyNegotiations use case', () => {
  
  it('should be able to get your negotiations', async () => {
    
    const contractorRepository = new InMemoryContractorsRepository();

    const userRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(userRepository);

    await createUser.execute(mockUser);
    await createUser.execute(mockUser1);

    const propertyRepository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(propertyRepository);
    
    await createProperty.execute(mockProperty1);

    const schedule = new Schedule(propertyRepository, userRepository, contractorRepository);
    await schedule.execute({ propertyId: mockProperty1.id, user: mockUser1 });
    
    const sut = new GetMyNegotiations(contractorRepository, propertyRepository);
    const result = await sut.execute({
      contractorName: mockUser1.name,
      contractorPhone: mockUser1.phone
    });

    expect(result.value).toHaveLength(1);
  });

  it('should not be able to get your negotiations if the contractor not exists', async () => {
    
    const contractorRepository = new InMemoryContractorsRepository();

    const userRepository = new InMemoryUsersRepository();

    const propertyRepository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(propertyRepository);
    
    await createProperty.execute(mockProperty1);
    
    const sut = new GetMyNegotiations(contractorRepository, propertyRepository);
    const result = await sut.execute({
      contractorName: 'invalid_name',
      contractorPhone: 'invalid_phone'
    });

    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toContain({ _message: 'Contractor not exists'});
  });

}); 