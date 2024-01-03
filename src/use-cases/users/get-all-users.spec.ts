import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { GetAllUsers } from './get-all-users';
import { CreateUser } from './create-user';
import { mockUser, mockUser1 } from '../../mocks/mocks';

describe('GetAllUsers', () => {

  it('should be able to get all users', async () => {

    const repository = new InMemoryUsersRepository();

    const createUser = new CreateUser(repository);
    await createUser.execute(mockUser);
    await createUser.execute(mockUser1);

    const sut = new GetAllUsers(repository);

    const result = await sut.execute();

    expect(result.value).toEqual(repository.items);
  });
});