import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import * as HttpStatus from 'http-status-codes';

import { ProblemDetails } from './problem-details.interface';

function httpExceptionToProblemDetails(
  exception: HttpException,
  request: any
): ProblemDetails {
  const status = exception.getStatus();
  const { message } = exception;
  const title = HttpStatus.getStatusText(status);

  const problemDetails = {
    type: `https://httpstatuses.com/${status}`,
    status,
    title,
    details: message,
    instance: request.url,
  };

  return problemDetails;
}

function exceptionToProblemDetails(
  exception: Error,
  request: any
): ProblemDetails {
  const status = HttpStatus.INTERNAL_SERVER_ERROR;
  const title = HttpStatus.getStatusText(status);

  const problemDetails = {
    type: `https://httpstatuses.com/${status}`,
    title,
    status,
    details: exception?.message,
    instance: request.url,
  };

  return problemDetails;
}

@Catch()
export class ProblemDetailsExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const problemDetails =
      exception instanceof HttpException
        ? httpExceptionToProblemDetails(exception, request)
        : exceptionToProblemDetails(exception as Error, request);

    response.status(problemDetails.status).json(problemDetails);
  }
}
