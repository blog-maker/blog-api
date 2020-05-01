import { SetMetadata, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from './joi-validation.pipe';

export const UseJoiValidation = (schema: any) => UsePipes(new JoiValidationPipe(schema));
