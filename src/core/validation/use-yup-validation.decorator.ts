import { UsePipes } from '@nestjs/common';
import { YupValidationPipe } from './yup-validation.pipe';

export const UseYupValidation = (schema: any) =>
  UsePipes(new YupValidationPipe(schema));
