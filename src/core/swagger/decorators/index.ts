import {
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ProblemDetails } from 'src/core/problem-details/problem-details.interface';

export function ApiDefaultInternalServerErrorResponse() {
  return ApiInternalServerErrorResponse({ type: ProblemDetails });
}

export function ApiDefaultUnauthorizedResponse() {
  return ApiUnauthorizedResponse({ type: ProblemDetails });
}
