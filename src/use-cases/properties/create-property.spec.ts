import { describe, expect, it } from 'vitest';
import { InMemoryPropertiesRepository } from '../../repositories/in-memory/in-memory-properties-repository';
import { CreateProperty } from './create-property';
import { Property } from '../../entities/property';
import { RequiredParametersError } from '../../errors/required-parameters-error';

describe('Create Property', () => {

  it('should be able to create a new property', async () => {

    const repository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(repository);

    const result = await createProperty.execute({
      id: '11111',
      address: 'test 123',
      category: 'test',
      description: 'test',
      images: [],
      price: 123,
      available: true,
      title: 'test',
      user: { connect: { id: 'string' } }
    });

    expect(result.value).toBeInstanceOf(Property);

  });

  it('should not to be able to create a new property if available is false', async () => {

    const repository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(repository);

    const result = await createProperty.execute({
      id: '11111',
      address: 'test 123',
      category: 'test',
      description: 'test',
      images: [],
      price: 123,
      available: false,
      title: 'test',
      user: { connect: { id: 'string' } }
    });

    expect(result.value).toBeInstanceOf(RequiredParametersError);

  });
});