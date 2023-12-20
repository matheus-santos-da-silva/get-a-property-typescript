import { describe, expect, it } from 'vitest';
import { InMemoryPropertiesRepository } from '../../repositories/in-memory/in-memory-properties-repository';
import { GetPropertyById } from './get-property-by-id';
import { Property } from '../../entities/property';
import { CreateProperty } from './create-property';
import { mockProperty } from '../../mocks/mocks';
import { RequiredParametersError } from '../../errors/required-parameters-error';

describe('Get Property By Id', () => {

  it('should be able to get property by id', async () => {

    const repository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(repository);
    const sut = new GetPropertyById(repository);

    await createProperty.execute(mockProperty);

    const result = await sut.execute('1');

    expect(result.value).toBeInstanceOf(Property);

  });

  it('should not to be able to get a property if id is incorrect', async () => {

    const repository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(repository);
    const sut = new GetPropertyById(repository);

    await createProperty.execute(mockProperty);

    const result = await sut.execute('invalid id');

    expect(result.value).toBeInstanceOf(RequiredParametersError);

  });
});