import { describe, expect, it } from 'vitest';
import { InMemoryPropertiesRepository } from '../../repositories/in-memory/in-memory-properties-repository';
import { GetPropertyById } from './get-property-by-id';
import { Property } from '../../entities/property';
import { CreateProperty } from './create-property';
import { Decimal } from '@prisma/client/runtime/library';
import { RequiredParametersError } from '../../errors/required-parameters-error';

const mockProperty = {
  id: '11111',
  address: 'test 123',
  category: 'test',
  description: 'test',
  images: [],
  price: new Decimal(123),
  available: true,
  title: 'test',
  user: { connect: { id: 'user_id' } }
};

describe('Get Property By Id', () => {

  it('should be able to get property by id', async () => {

    const repository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(repository);
    const sut = new GetPropertyById(repository);

    await createProperty.execute(mockProperty);

    const result = await sut.execute('11111');

    expect(result.value).toBeInstanceOf(Property);

  });

  it('should not to be able to get a property if id is incorrect', async () => {

    const repository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(repository);
    const sut = new GetPropertyById(repository);

    await createProperty.execute(mockProperty);

    const result = await sut.execute('0000000');

    expect(result.value).toBeInstanceOf(RequiredParametersError);

  });
});