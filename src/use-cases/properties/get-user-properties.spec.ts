import { describe, expect, it } from 'vitest';
import { InMemoryPropertiesRepository } from '../../repositories/in-memory/in-memory-properties-repository';
import { GetUserProperties } from './get-user-properties';
import { mockUser, mockProperty } from '../../mocks/mocks';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { CreateUser } from '../users/create-user';
import { CreateProperty } from './create-property';
import { RequiredParametersError } from '../../errors/required-parameters-error';

describe('GetUserProperties', () => {

  it('should be able to get user properties', async () => {

    const repository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(repository);
    const userRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(userRepository);

    const sut = new GetUserProperties(repository, userRepository);

    await createProperty.execute(mockProperty);
    await createUser.execute(mockUser);
    const result = await sut.execute(mockUser.id);

    expect(result.value).toEqual([repository.items[0]]);
  });

  it('should not to be able to get a user properties if user not exists', async () => {

    const repository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(repository);
    const userRepository = new InMemoryUsersRepository();

    await createProperty.execute(mockProperty);
    const sut = new GetUserProperties(repository, userRepository);

    const result = await sut.execute('22222222');

    expect(result.value).toBeInstanceOf(RequiredParametersError);
  });

});