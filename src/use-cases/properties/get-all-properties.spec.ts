import { describe, expect, it } from 'vitest';
import { InMemoryPropertiesRepository } from '../../repositories/in-memory/in-memory-properties-repository';
import { GetAllProperties } from './get-all-properties';
import { CreateProperty } from './create-property';
import { Decimal } from '@prisma/client/runtime/library';

const mockProperty1 = {
  id: '11111',
  address: 'test 123',
  category: 'test',
  description: 'test',
  images: [],
  price: new Decimal(123),
  available: true,
  title: 'test',
  user: { connect: { id: 'string' } }
};

const mockProperty2 = {
  id: '222222',
  address: 'test 222',
  category: 'test',
  description: 'test',
  images: [],
  price: new Decimal(200),
  available: true,
  title: 'test2',
  user: { connect: { id: 'string' } }
};


describe('Get All Properties', () => {

  it('should be able to get all properties', async () => {

    const repository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(repository);
    const getAllProperties = new GetAllProperties(repository);

    await createProperty.execute(mockProperty1);
    await createProperty.execute(mockProperty2);

    const result = await getAllProperties.execute();
    console.log(result.value);

    expect(result.value).toHaveLength(2);
    expect(result.value).toEqual(repository.items);
  });

});