import { describe, expect, it } from 'vitest';
import { InMemoryPropertiesRepository } from '../../repositories/in-memory/in-memory-properties-repository';
import { CreateProperty } from './create-property';
import { Property, categoryEnum } from '../../entities/property';
import { Decimal } from '@prisma/client/runtime/library';
import { mockProperty } from '../../mocks/mocks';
import { RequiredParametersError } from '../../errors/required-parameters-error';

describe('Create Property', () => {

  it('should be able to create a new property', async () => {

    const repository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(repository);

    const result = await createProperty.execute({
      id: '1',
      address: 'your-address',
      category: categoryEnum.Apartamento,
      description: 'your-description',
      images: [],
      price: new Decimal(123),
      title: 'apartment',
      user: { connect: { id: 'string' } }
    });

    expect(result.value).toBeInstanceOf(Property);

  });

  it('should not to be able to create a property if the address is already in use', async () => {

    const repository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(repository);

    await createProperty.execute(mockProperty);

    const result = await createProperty.execute({
      id: '1',
      address: mockProperty.address,
      category: categoryEnum.Apartamento,
      description: 'your-description',
      images: [],
      price: new Decimal(123),
      title: 'apartment',
      user: { connect: { id: 'string' } }
    });

    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toContain({ _message: 'This address is already in use' });

  });

  it('should not to be able to create a property if the category is not valid', async () => {

    const repository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(repository);

    const result = await createProperty.execute({
      id: '1',
      address: mockProperty.address,
      category: 'invalid-category',
      description: 'your-description',
      images: [],
      price: new Decimal(123),
      title: 'apartment',
      user: { connect: { id: 'string' } }
    });

    expect(result.value).toBeInstanceOf(RequiredParametersError);
    expect(result.value).toContain({ _message: 'That category is not valid' });

  });
});