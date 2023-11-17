import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { GetAllUsers } from './get-all-users';
import { CreateUser } from './create-user';

const mockUser1 = {
  id: '1111111',
  email: 'test@test.com',
  name: 'test',
  password: '123456',
  phone: '111111111'
};

const mockUser2 = {
  id: '2222222',
  email: 'test2@test.com',
  name: 'test',
  password: '123456',
  phone: '111111111'
};

describe('GetAllUsers', () => {

  it('should be able to get all users', async () => {

    const repository = new InMemoryUsersRepository();

    const createUser = new CreateUser(repository);
    await createUser.execute(mockUser1);
    await createUser.execute(mockUser2);

    const sut = new GetAllUsers(repository);

    const result = await sut.execute();

    expect(result.value).toEqual(repository.items);
  });
});