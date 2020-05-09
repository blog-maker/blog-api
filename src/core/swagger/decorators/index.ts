import {
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { ProblemDetails } from '../../../core/problem-details/problem-details.interface';

export function ApiDefaultInternalServerErrorResponse() {
  return ApiInternalServerErrorResponse({ type: ProblemDetails });
}

export function ApiDefaultUnauthorizedResponse() {
  return ApiUnauthorizedResponse({ type: ProblemDetails });
}

export function ApiDefaultConflictResponse() {
  return ApiConflictResponse({ type: ProblemDetails });
}

export function ApiDefaultNotFoundResponse() {
  return ApiNotFoundResponse({ type: ProblemDetails });
}
