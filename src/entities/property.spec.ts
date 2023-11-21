import { describe, expect, it } from 'vitest';
import { Property } from './property';

describe('Propertiy class', () => {

  it('should be able to create a new property', () => {

    const newProperty = new Property({
      id: '11111111',
      category: 'test',
      title: 'test',
      price: 10,
      address: 'test',
      available: true,
      description: '',
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