import { z } from 'zod';

export const createUserValidationSchema = z.object({

  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string'
  }),

  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string'
  }).email('Invalid email'),

  phone: z.string({
    required_error: 'Phone is required',
    invalid_type_error: 'Phone must be a string'
  }),

  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string'
  }).min(6, 'Password must have 6 characters at least'),

  confirmpassword: z.string({
    required_error: 'Confirmpassword is required',
    invalid_type_error: 'Confirmpassword must be a string'
  }).min(6, 'Password must have 6 characters at least')

}).refine((data) => data.password === data.confirmpassword, {
  message: 'Passwords do not match'
});