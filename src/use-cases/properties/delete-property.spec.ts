import { describe, expect, it } from 'vitest';
import { InMemoryPropertiesRepository } from '../../repositories/in-memory/in-memory-properties-repository';
import { mockUser, mockProperty, mockUser1 } from '../../mocks/mocks';
import { CreateUser } from '../users/create-user';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { CreateProperty } from './create-property';
import { DeleteProperty } from './delete-property';
import { RequiredParametersError } from '../../errors/required-parameters-error';

describe('Delete Property use case', () => {
  
  it('should be able to delete a property', async () => {
    
    const userRepository = new InMemoryUsersRepository();
    const propertyRepository = new InMemoryPropertiesRepository();

    const createUser = new CreateUser(userRepository);
    await createUser.execute(mockUser);

    const createProperty = new CreateProperty(propertyRepository);
    await createProperty.execute(mockProperty);

    const sut = new DeleteProperty(propertyRepository, userRepository);

    const result = await sut.execute({
      propertyId: mockProperty.id,
      userId: mockUser.id
    });

    expect(result.value).toEqual({ message: 'Property deleted successfully' });
  });

  it('should not to be able to delete a property if user not exists', async () => {
    
    const userRepository = new InMemoryUsersRepository();
    const propertyRepository = new InMemoryPropertiesRepository();

    const createProperty = new CreateProperty(propertyRepository);
    await createProperty.execute(mockProperty);

    const sut = new DeleteProperty(propertyRepository, userRepository);
    const result = await sut.execute({
      propertyId: mockProperty.id,
      userId: 'invalid-id'
    });

    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toContain({ _message: 'User not found' });

  });


  it('should not to be able to delete a property if property not exists', async () => {

    const userRepository = new InMemoryUsersRepository();
    const propertyRepository = new InMemoryPropertiesRepository();

    const createUser = new CreateUser(userRepository);
    await createUser.execute(mockUser);

    const sut = new DeleteProperty(propertyRepository, userRepository);
    const result = await sut.execute({
      propertyId: 'invalid-id',
      userId: mockUser.id
    });

    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toContain({ _message: 'Property not found' });

  });

  it('should not to be able to delete a property if it is not mine', async () => {
  
    const userRepository = new InMemoryUsersRepository();
    const propertyRepository = new InMemoryPropertiesRepository();

    const createUser = new CreateUser(userRepository);
    await createUser.execute(mockUser1);

    const createProperty = new CreateProperty(propertyRepository);
    await createProperty.execute(mockProperty);

    const sut = new DeleteProperty(propertyRepository, userRepository);
    const result = await sut.execute({
      propertyId: mockProperty.id,
      userId: mockUser1.id
    });

    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toContain({ _message: 'This property is not yours' });

  });

});