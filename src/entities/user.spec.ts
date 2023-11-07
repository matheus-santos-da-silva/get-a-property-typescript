import { it, describe, expect } from 'vitest';
import { User } from './user';

describe('Testing User', () => {

  it('should able to create a user', () => {

    const user = new User({
      id: '1111111',
      email: 'test@email.com',
      name: 'John Doe',
      password: '123456',
      phone: '999999999'
    });

    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe('John Doe');
  });

  it('should not able to create a user if a password have not 5 characters at least', () => {

    expect(() => {
      new User({
        id: '1111111',
        email: 'test@email.com',
        name: 'John Doe',
        password: '123',
        phone: '999999999'
      });
    }).toThrow();
  });

});