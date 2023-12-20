import { describe, expect, it } from 'vitest';
import { InMemoryPropertiesRepository } from '../../repositories/in-memory/in-memory-properties-repository';
import { GetAllProperties } from './get-all-properties';
import { CreateProperty } from './create-property';
import { mockProperty, mockProperty1 } from '../../mocks/mocks';

describe('Get All Properties', () => {

  it('should be able to get all properties', async () => {

    const repository = new InMemoryPropertiesRepository();
    const createProperty = new CreateProperty(repository);
    const getAllProperties = new GetAllProperties(repository);

    await createProperty.execute(mockProperty);
    await createProperty.execute(mockProperty1);

    const result = await getAllProperties.execute();

    expect(result.value).toHaveLength(2);
    expect(result.value).toEqual(repository.items);
  });

});