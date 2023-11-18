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
});