import { describe, expect, it } from 'vitest';
import { mockUser, mockUser1, mockProperty1 } from '../../mocks/mocks';
import { InMemoryPropertiesRepository } from '../../repositories/in-memory/in-memory-properties-repository';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { CreateUser } from '../users/create-user';
import { CreateProperty } from './create-property';
import { EditProperty } from './edit-property';
import { Decimal } from '@prisma/client/runtime/library';
import { RequiredParametersError } from '../../errors/required-parameters-error';
import { categoryEnum } from '../../entities/property';

const mockProperty = {
  id: '1',
  address: 'test 123',
  category: categoryEnum.Apartamento,
  description: 'test',
  images: [],  
  price: new Decimal(123),
  title: 'test',
  user: { connect: { id: mockUser.id } }
};

describe('Edit Property use case' , () => {
  
  it('should be able to edit property', async () => {

    const userRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(userRepository);

    await createUser.execute(mockUser);

    const propertyRepository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(propertyRepository);

    await createProperty.execute(mockProperty);

    const sut = new EditProperty(propertyRepository);
    const result = await sut.execute(
      mockProperty.id,
      mockUser.id,
      {
        address: 'edited',
        category: categoryEnum.Casa,
        description: 'edited',
        images: [],
        price: new Decimal(2),
        title: 'edited'
      }
    );
    
    expect(result.value).toEqual({ message: 'Property updated successfully' });
    expect(propertyRepository.items[0]).toContain({ address: 'edited' });

  });

  it('should not to be able to edit property if the property is not mine', async () => {
    
    const userRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(userRepository);

    await createUser.execute(mockUser1);

    const propertyRepository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(propertyRepository);

    await createProperty.execute(mockProperty);

    const sut = new EditProperty(propertyRepository);
    const result = await sut.execute(
      mockProperty.id,
      mockUser1.id,
      {
        address: 'edited',
        category: categoryEnum.Casa,
        description: 'edited',
        images: [],
        price: new Decimal(2),
        title: 'edited'
      }
    );

    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toContain({ _message: 'This property is not yours'});

  });

  it('should not to be able to edit property if the property not exists', async () => {
    
    const userRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(userRepository);

    await createUser.execute(mockUser);

    const propertyRepository = new InMemoryPropertiesRepository();

    const sut = new EditProperty(propertyRepository);
    const result = await sut.execute(
      mockProperty.id,
      mockUser.id,
      {
        address: 'edited',
        category: categoryEnum.Casa,
        description: 'edited',
        images: [],
        price: new Decimal(2),
        title: 'edited'
      }
    );

    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toContain({ _message: 'Property not found'});

  });

  it('should not to be able to edit property if the address passed already exists', async () => {
    
    const userRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(userRepository);

    await createUser.execute(mockUser);

    const propertyRepository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(propertyRepository);

    await createProperty.execute(mockProperty);
    await createProperty.execute(mockProperty1);

    const sut = new EditProperty(propertyRepository);
    const result = await sut.execute(
      mockProperty.id,
      mockUser.id,
      {
        address: mockProperty1.address,
        category: categoryEnum.Casa,
        description: 'edited',
        images: [],
        price: new Decimal(2),
        title: 'edited'
      }
    );

    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toContain({ _message: 'This address already exists, try again with another one'});

  });

  it('should not to be able to edit property if the category is not valid', async () => {
    
    const userRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(userRepository);

    await createUser.execute(mockUser);

    const propertyRepository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(propertyRepository);

    await createProperty.execute(mockProperty);
    await createProperty.execute(mockProperty1);

    const sut = new EditProperty(propertyRepository);
    const result = await sut.execute(
      mockProperty.id,
      mockUser.id,
      {
        address: 'edited',
        category: 'invalid-category',
        description: 'edited',
        images: [],
        price: new Decimal(2),
        title: 'edited'
      }
    );

    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toContain({ _message: 'That category is not valid'});

  });
});