import { describe, expect, it } from 'vitest';
import { CreateUser } from './create-user';
import { User } from '../entities/user';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';

describe('Create User', () => {
  it('should be able to create a new user', () => {

    const repository = new InMemoryUsersRepository();
    const createUser = new CreateUser(repository);

    expect(createUser.execute({
      id: '111111',
      email: 'test@test.com',
      name: 'test',
      password: '123456',
      phone: '9999999'
    })).resolves.toBeInstanceOf(User);
  });

  it('should not be able create a new user if email passed already exists', async () => {

    const repository = new InMemoryUsersRepository();
    const createUser = new CreateUser(repository);

    await createUser.execute({
      id: '111111',
      email: 'test@test.com',
      name: 'test',
      password: '2222222',
      phone: '88888888'
    });

    expect(
      createUser.execute({
        id: '222222',
        email: 'test@test.com',
        name: 'test2',
        password: '33333333',
        phone: '9999999'
      })
    ).rejects.toBeInstanceOf(Error);

  });
});