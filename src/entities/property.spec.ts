import { describe, expect, it } from 'vitest';
import { Decimal } from '@prisma/client/runtime/library';
import { Property } from './property';

describe('Propertiy class', () => {

  it('should be able to create a new property', () => {

    const newProperty = new Property({
      id: '11111111',
      category: 'test',
      title: 'test',
      price: new Decimal(10),
      address: 'test',
      available: true,
      description: '',
      contractorId: null,
      id_user: 'id',
      user: {
        connect: {
          id: 'id'
        }
      }
    });

    expect(newProperty).toBeInstanceOf(Property);
    expect(newProperty.category).toBe('test');
  });

});