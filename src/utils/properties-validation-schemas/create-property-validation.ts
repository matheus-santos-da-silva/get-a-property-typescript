import { z } from 'zod';

export const createPropertyValidationSchema = z.object({

  category: z.string({
    required_error: 'Category is required',
    invalid_type_error: 'Category must be a string'
  }),

  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string'
  }),

  price: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a numeric'
  }),

  address: z.string({
    required_error: 'Address is required',
    invalid_type_error: 'Address must be a string'
  }),

});
