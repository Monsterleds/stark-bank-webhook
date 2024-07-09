import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";

function parseErrors(validationErrors: ValidationError[]): any {
  return validationErrors.map((validation) => {
    if (validation?.children && validation?.children?.length > 0) {
      const errors = parseErrors(validation.children);

      return errors;
    }

    return Object.values(validation.constraints || {});
  });
}

export async function validateDTO(req: Request, res: Response, next: NextFunction, dto: any) {
  try {
    const validator: any = new dto();

    Object.keys(req.body).forEach((key) => {
      validator[key] = req.body[key];
    });

    const validatorObject = plainToInstance(dto, req.body);
    const validationErrors = await validate(validatorObject);

    const errors = parseErrors(validationErrors).flat(Infinity);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    next();
  } catch (errors: any) {
    return res.status(500).send();
  }
}
