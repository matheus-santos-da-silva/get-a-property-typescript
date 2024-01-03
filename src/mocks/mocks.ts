import { Decimal } from '@prisma/client/runtime/library';

export const mockUser = {
  id: '1',
  email: 'johndoe@test.com',
  name: 'John Doe',
  password: '123456',
  phone: '111111111'
};

export const mockUser1 = {
  id: '2',
  email: 'anyone@test.com',
  name: 'Anyone',
  password: '123456',
  phone: '33333333333'
};

export const mockProperty = {
  id: '1',
  address: 'test 123',
  category: 'test',
  description: 'test',
  images: [],
  price: new Decimal(123),
  title: 'test',
  user: { connect: { id: mockUser.id } }
};

export const mockProperty1 = {
  id: '2',
  address: 'test 1234',
  category: 'test',
  description: 'test',
  images: [],
  price: new Decimal(123),
  title: 'test',
  user: { connect: { id: mockUser.id } }
};