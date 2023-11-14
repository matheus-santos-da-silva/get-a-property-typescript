/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, Request, Response } from 'express';
import { CreateUserRequest } from '../DTO/user-dtos';
import { createUserValidationSchema } from '../utils/validation-schemas';
import { z } from 'zod';

export const validationRegisterMiddleware = (
  request: Request<{}, {}, CreateUserRequest>,
  response: Response,
  next: NextFunction) => {

  try {

    const data = request.body;
    createUserValidationSchema.parse(data);

    next();

  } catch (error) {

    if (error instanceof z.ZodError) {
      response.status(400).json(error.errors.map((error) => error.message));
      return;
    }
  }
};