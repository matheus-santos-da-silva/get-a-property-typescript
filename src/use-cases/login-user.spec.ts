import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { LoginUser } from './login-user';
import { CreateUser } from './create-user';

describe('Login User', () => {

  it('should be able to login user', async () => {

    const repository = new InMemoryUsersRepository();
    const createUser = new CreateUser(repository);
    const sut = new LoginUser(repository);

    const user = await createUser.execute({
      id: '111111',
      email: 'test@test.com',
      name: 'test',
      password: '123456',
      phone: '111111111'
    });

    expect(
      sut.execute({
        email: 'test@test.com',
        password: '123456'
      })
    ).resolves.toContain({
      message: 'User logged successfully',
      userId: user.id
    });

  });

  it('should not be able to login user if the credentials passed do not exists', () => {

    const repository = new InMemoryUsersRepository();
    const sut = new LoginUser(repository);

    expect(
      sut.execute({
        email: 'test@test.com',
        password: 'test'
      })
    ).rejects.toBeInstanceOf(Error);
  });
});