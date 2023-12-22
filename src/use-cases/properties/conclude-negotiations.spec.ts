import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { InMemoryPropertiesRepository } from '../../repositories/in-memory/in-memory-properties-repository';
import { CreateUser } from '../users/create-user';
import { mockUser, mockProperty, mockUser1 } from '../../mocks/mocks';
import { CreateProperty } from './create-property';
import { ConcludeNegotiation } from './conclude-negotiation';
import { RequiredParametersError } from '../../errors/required-parameters-error';

describe('Conclude Negotiations use case', () => {

  it('should be able to conlude a negotiation', async () => {
    
    const userRepository = new InMemoryUsersRepository();
    const propertyRepository = new InMemoryPropertiesRepository();

    const createUser = new CreateUser(userRepository);
    await createUser.execute(mockUser);

    const createProperty = new CreateProperty(propertyRepository);
    await createProperty.execute(mockProperty);

    const sut = new ConcludeNegotiation(propertyRepository, userRepository);

    const result = await sut.execute({
      userId: mockUser.id,
      propertyId: mockProperty.id
    });

    expect(result.value).toEqual('Negotiation completed successfully');
    expect(propertyRepository.items).toHaveLength(0);
  });

  it('should not be able to complete a negotiation if there is no property with the given id', async () => {
    
    const userRepository = new InMemoryUsersRepository();
    const propertyRepository = new InMemoryPropertiesRepository();

    const createUser = new CreateUser(userRepository);
    await createUser.execute(mockUser);

    const sut = new ConcludeNegotiation(propertyRepository, userRepository);

    const result = await sut.execute({
      userId: mockUser.id,
      propertyId: mockProperty.id
    });

    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toContain({ _message: 'Property not found'});
  });

  it('should not be able to complete a negotiation if there is no user with the given id', async () => {
    
    const userRepository = new InMemoryUsersRepository();
    const propertyRepository = new InMemoryPropertiesRepository();

    const createProperty = new CreateProperty(propertyRepository);
    await createProperty.execute(mockProperty);

    const sut = new ConcludeNegotiation(propertyRepository, userRepository);

    const result = await sut.execute({
      userId: mockUser.id,
      propertyId: mockProperty.id
    });

    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toContain({ _message: 'User not found'});
  });

  it('should not be able to complete a negotiation if the property not is mine', async () => {
    
    const userRepository = new InMemoryUsersRepository();
    const propertyRepository = new InMemoryPropertiesRepository();

    const createUser = new CreateUser(userRepository);
    await createUser.execute(mockUser1);

    const createProperty = new CreateProperty(propertyRepository);
    await createProperty.execute(mockProperty);

    const sut = new ConcludeNegotiation(propertyRepository, userRepository);

    const result = await sut.execute({
      userId: mockUser1.id,
      propertyId: mockProperty.id
    });

    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toContain({ _message: 'This property is not yours'});
  });

});