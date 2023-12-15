import { Request } from 'express';

export const CreatePropertyValidation = (request: Request) => {

  const validations = [
    { field: 'category' },
    { field: 'address' },
    { field: 'price' },
    { field: 'title' }
  ];
  
  for (const validation of validations) {
    if (!request.body[validation.field]) {
      return { isValid: false, message: `${validation.field} is required`};
    }
  }
  
  return { isValid: true };
};