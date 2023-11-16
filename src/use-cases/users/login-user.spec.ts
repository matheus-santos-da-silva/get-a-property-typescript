import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { LoginUser } from './login-user';
import { CreateUser } from './create-user';
import { RequiredParametersError } from '../../errors/required-parameters-error';

describe('Login User', () => {

  it('should be able to login user', async () => {

    const repository = new InMemoryUsersRepository();
    const createUser = new CreateUser(repository);
    const sut = new LoginUser(repository);

    await createUser.execute({
      id: '111111',
      email: 'test@test.com',
      name: 'test',
      password: '123456',
      phone: '111111111'
    });

    const result = await sut.execute({
      email: 'test@test.com',
      password: '123456'
    });

    expect(result.value).contain({
      message: 'You are logged!'
    });

  });

  it('should not be able to login user if the credentials passed do not exists', async () => {

    const repository = new InMemoryUsersRepository();
    const sut = new LoginUser(repository);

    const result = await sut.execute({
      email: 'test@test.com',
      password: '123456'
    });

    expect(result.value).toBeInstanceOf(RequiredParametersError);
  });
});