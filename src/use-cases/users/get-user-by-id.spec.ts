import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { GetUserById } from './get-user-by-id';
import { CreateUser } from './create-user';
import { RequiredParametersError } from '../../errors/required-parameters-error';
import { mockUser } from '../../mocks/mocks';

describe('Get User By Id', () => {

  it('should be able to get user by id', async () => {

    const repository = new InMemoryUsersRepository();
    const createUser = new CreateUser(repository);
    const sut = new GetUserById(repository);

    await createUser.execute(mockUser);

    const result = await sut.execute(mockUser.id);

    expect(result.value).contain({
      id: mockUser.id,
      email: mockUser.email,
      name: mockUser.name,
      phone: mockUser.phone
    });
  });

  it('should not be able to get user if id not exists', async () => {

    const repository = new InMemoryUsersRepository();
    const sut = new GetUserById(repository);

    const result = await sut.execute(mockUser.id);

    expect(result.value).toBeInstanceOf(RequiredParametersError);
  });
});