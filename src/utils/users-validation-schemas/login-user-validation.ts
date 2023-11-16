import { z } from 'zod';

export const LoginUserValidationSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string'
  }).email('Invalid email'),

  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string'
  }).min(6, 'Password must have 6 characters at least'),
});