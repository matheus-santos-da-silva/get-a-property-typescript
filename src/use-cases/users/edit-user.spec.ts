import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { EditUser } from './edit-user';
import { CreateUser } from './create-user';
import { RequiredParametersError } from '../../errors/required-parameters-error';

const mockId = '123132453534';

const mockUser1 = {
  id: mockId,
  email: 'test@test.com',
  name: 'test',
  password: '123456',
  phone: '111111111'
};

const mockUser2 = {
  id: '12234452',
  email: 'test3@test.com',
  name: 'test3',
  password: '123456',
  phone: '111111111'
};


describe('Edit User', () => {

  it('should able to edit user if all ', async () => {

    const repository = new InMemoryUsersRepository();
    const createUser = new CreateUser(repository);
    const sut = new EditUser(repository);

    await createUser.execute(mockUser1);

    const result = await sut.execute(
      mockId,
      {
        email: 'test2@test.com',
        name: 'test2',
        password: '1234567',
        phone: '22222222'
      });

    expect(result.value).contain({ message: 'User updated successfully' });
    expect(repository.items[0]).contain({
      id: mockId,
      email: 'test2@test.com',
      name: 'test2'
    });
  });

  it('should not be able to edit user if id not exist', async () => {

    const repository = new InMemoryUsersRepository();
    const sut = new EditUser(repository);

    const result = await sut.execute(mockId, mockUser1);

    expect(result.value).toBeInstanceOf(RequiredParametersError);
  });

  it('should not be able to edit user if email already exist', async () => {

    const repository = new InMemoryUsersRepository();
    const createUser = new CreateUser(repository);
    const sut = new EditUser(repository);

    await createUser.execute(mockUser1);
    await createUser.execute(mockUser2);
    const result = await sut.execute(mockId, {
      email: 'test3@test.com',
      name: 'test2',
      phone: '2349234290',
      password: 'a23qdpwadwiop'
    });

    expect(result.value).toBeInstanceOf(RequiredParametersError);
  });
});