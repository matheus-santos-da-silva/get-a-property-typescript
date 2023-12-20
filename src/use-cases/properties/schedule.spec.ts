import { Decimal } from '@prisma/client/runtime/library';
import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { InMemoryPropertiesRepository } from '../../repositories/in-memory/in-memory-properties-repository';
import { InMemoryContractorsRepository } from '../../repositories/in-memory/in-memory-contractors-repository';
import { Schedule } from './schedule';
import { CreateUser } from '../users/create-user';
import { CreateProperty } from './create-property';
import { RequiredParametersError } from '../../errors/required-parameters-error';
import { mockProperty, mockUser, mockUser1 } from '../../mocks/mocks';

describe('Schedule use case', () => {
    
  it('should be able to schedule a visit', async () => {

    const userRepository = new InMemoryUsersRepository();
    const propertyRepository = new InMemoryPropertiesRepository();
    const contractorRepository = new InMemoryContractorsRepository();

    const createUser = new CreateUser(userRepository);
    await createUser.execute(mockUser);
    await createUser.execute(mockUser1);

    const createProperty = new CreateProperty(propertyRepository);
    await createProperty.execute(mockProperty);
    
    const sut = new Schedule(propertyRepository, userRepository, contractorRepository);
    const result = await sut.execute({ 
      propertyId: mockProperty.id,
      user: mockUser1
    });

    expect(result.value).toEqual(`Visit scheduled succefully, contact ${mockUser.name} and call ${mockUser.phone}`);
  });

  it('should not be able to schedule a visit if the property not exists', async () => {
    
    const userRepository = new InMemoryUsersRepository();
    const propertyRepository = new InMemoryPropertiesRepository();
    const contractorRepository = new InMemoryContractorsRepository();

    const createUser = new CreateUser(userRepository);
    await createUser.execute(mockUser);
    await createUser.execute(mockUser1);

    const sut = new Schedule(propertyRepository, userRepository, contractorRepository);
    const result = await sut.execute({ 
      propertyId: mockProperty.id,
      user: mockUser1
    });

    expect(result.value).toBeInstanceOf(RequiredParametersError); 
    expect(result.value).toContain({ _message: 'This property not exists'});
  });

  it('should not be able to schedule a visit to my own property', async () => {
    
    const userRepository = new InMemoryUsersRepository();
    const propertyRepository = new InMemoryPropertiesRepository();
    const contractorRepository = new InMemoryContractorsRepository();

    const createUser = new CreateUser(userRepository);
    await createUser.execute(mockUser);

    const createProperty = new CreateProperty(propertyRepository);
    await createProperty.execute(mockProperty);

    const sut = new Schedule(propertyRepository, userRepository, contractorRepository);
    const result = await sut.execute({ 
      propertyId: mockProperty.id,
      user: mockUser
    });

    expect(result.value).toBeInstanceOf(RequiredParametersError); 
    expect(result.value).toContain({ _message: 'You can not schedule a visit to your own property'});
  });

  it('should not be able to schedule a visit if the owner not exists', async () => {
    
    const userRepository = new InMemoryUsersRepository();
    const propertyRepository = new InMemoryPropertiesRepository();
    const contractorRepository = new InMemoryContractorsRepository();

    const createUser = new CreateUser(userRepository);
    await createUser.execute(mockUser1);

    const createProperty = new CreateProperty(propertyRepository);
    await createProperty.execute(mockProperty);

    const sut = new Schedule(propertyRepository, userRepository, contractorRepository);
    const result = await sut.execute({ 
      propertyId: mockProperty.id,
      user: mockUser1
    });

    expect(result.value).toBeInstanceOf(RequiredParametersError); 
    expect(result.value).toContain({ _message: 'The owner of this property does not exist'});
  });

  it('should not be able to schedule a visit to a property twice', async () => {

    const userRepository = new InMemoryUsersRepository();
    const propertyRepository = new InMemoryPropertiesRepository();
    const contractorRepository = new InMemoryContractorsRepository();

    const createUser = new CreateUser(userRepository);
    await createUser.execute(mockUser);
    await createUser.execute(mockUser1);

    const createProperty = new CreateProperty(propertyRepository);
    await createProperty.execute(mockProperty);

    const sut = new Schedule(propertyRepository, userRepository, contractorRepository);
    await sut.execute({ 
      propertyId: mockProperty.id,
      user: mockUser1
    });

    const result = await sut.execute({ 
      propertyId: mockProperty.id,
      user: mockUser1
    });
    
    expect(result.value).toBeInstanceOf(RequiredParametersError); 
    expect(result.value).toContain({ _message: 'You already scheduled visit to this property'});
  });

});