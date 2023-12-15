import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

type SchemaType<T> = z.ZodType<T, any, any>;

export const validationMiddleware = <T>(

  schema: SchemaType<T>
) => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      const data: T = request.body;
      console.log(data);
      schema.parse(data);

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        response.status(422).json(error.errors.map((error) => error.message));
        return;
      }
    }
  };
};