import { describe, expect, it } from 'vitest';
import { Contractor } from './contractor';
import { Property } from './property';
import { Decimal } from '@prisma/client/runtime/library';

describe('Contractor entity', () => {

  it('should be able to create a new Contractor', () => {

    const property = new Property({
      id: '11111111',
      category: 'test',
      title: 'test',
      price: new Decimal(10),
      address: 'test',
      description: '',
      contractorId: null,
      id_user: 'id',
      user: {
        connect: {
          id: 'id'
        }
      }
    });

    const properties = Array(property);

    const newContractor = new Contractor({
      id: 'id',
      name: 'test',
      phone: '999999',
      property: properties
    });

    expect(newContractor).toBeInstanceOf(Contractor);
    expect(newContractor.name).toBe('test');
  });

});