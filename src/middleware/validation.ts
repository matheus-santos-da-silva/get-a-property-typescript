/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SchemaType<T> = z.ZodType<T, any, any>;

export const validationMiddleware = <T>(

  schema: SchemaType<T>
) => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      const data: T = request.body;
      schema.parse(data);

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        response.status(400).json(error.errors.map((error) => error.message));
        return;
      }
    }
  };
};