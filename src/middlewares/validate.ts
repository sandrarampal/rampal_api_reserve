import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Erreur de validation",
          errors: error.issues.map((e) => {
            return {
              field: e.path.join("."),
              message: e.message,
            };
          }),
        });
      }
      next(error);
    }
  };
};

export default validate;
