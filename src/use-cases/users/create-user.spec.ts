import { describe, expect, it } from 'vitest';
import { CreateUser } from './create-user';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { User } from '../../entities/user';
import { RequiredParametersError } from '../../errors/required-parameters-error';

describe('Create User', () => {
  it('should be able to create a new user', async () => {

    const repository = new InMemoryUsersRepository();
    const sut = new CreateUser(repository);

    const result = await sut.execute({
      id: '111111',
      email: 'test@test.com',
      name: 'test',
      password: '123456',
      phone: '9999999'
    });

    expect(result.value).toBeInstanceOf(User);
  });

  it('should not be able create a new user if email passed already exists', async () => {

    const repository = new InMemoryUsersRepository();
    const sut = new CreateUser(repository);

    await sut.execute({
      id: '111111',
      email: 'test@test.com',
      name: 'test',
      password: '2222222',
      phone: '88888888'
    });

    const result = await sut.execute({
      id: '222222',
      email: 'test@test.com',
      name: 'test2',
      password: '33333333',
      phone: '9999999'
    });

    expect(result.value).toBeInstanceOf(RequiredParametersError);

  });
});