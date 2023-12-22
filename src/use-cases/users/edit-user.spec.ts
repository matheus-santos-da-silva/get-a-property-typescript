import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { EditUser } from './edit-user';
import { CreateUser } from './create-user';
import { RequiredParametersError } from '../../errors/required-parameters-error';
import { mockUser, mockUser1 } from '../../mocks/mocks';

describe('Edit User', () => {

  it('should able to edit user if all ', async () => {

    const repository = new InMemoryUsersRepository();
    const createUser = new CreateUser(repository);
    const sut = new EditUser(repository);

    await createUser.execute(mockUser);

    const result = await sut.execute(
      mockUser.id,
      mockUser.id,
      {
        email: 'test2@test.com',
        name: 'test2',
        password: '1234567',
        phone: '22222222'
      });

    expect(result.value).contain({ message: 'User updated successfully' });
    expect(repository.items[0]).contain({
      id:  mockUser.id,
      email: 'test2@test.com',
      name: 'test2'
    });
  });

  it('should not be able to edit user if id not exist', async () => {

    const repository = new InMemoryUsersRepository();
    const sut = new EditUser(repository);

    const result = await sut.execute('invalid-id', 'invalid-id', mockUser1);

    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toContain({ _message: 'User not exists'});
  });

  it('should not be able to edit user if email already exist', async () => {

    const repository = new InMemoryUsersRepository();
    const createUser = new CreateUser(repository);
    const sut = new EditUser(repository);

    await createUser.execute(mockUser1);
    await createUser.execute(mockUser);
    const result = await sut.execute(
      mockUser.id,
      mockUser.id, {
        email: 'test2@test.com',
        name: 'John Doe',
        phone: '2349234290',
        password: '123'
      });

    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toContain({ _message: 'Email is already in use, please try again with another email'});
  });

  it('should not be possible to edit the user if this account is not mine', async () => {

    const repository = new InMemoryUsersRepository();
    const createUser = new CreateUser(repository);
    
    await createUser.execute(mockUser);

    const sut = new EditUser(repository);
    const result = await sut.execute(
      mockUser.id,
      'incorrect-id', {
        email: 'aleatory@test.com',
        name: 'John Doe',
        phone: '2349234290',
        password: '123'
      });

    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toContain({ _message: 'This account is not yours, please try again with your account'});
  });
});