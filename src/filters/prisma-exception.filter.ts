import { Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

type PrismaException =
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientInitializationError
  | Prisma.PrismaClientUnknownRequestError
  | Prisma.PrismaClientValidationError
  | Prisma.PrismaClientRustPanicError;

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientUnknownRequestError,
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientRustPanicError,
)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: PrismaException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      this.logger.error(`[${exception.code}] ${exception.message}`, exception.stack);

      switch (exception.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          break;
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          break;
        case 'P2003':
        case 'P2014':
          status = HttpStatus.BAD_REQUEST;
          break;
      }
    } else {
      this.logger.error(`[${exception.constructor.name}] ${exception.message}`, exception.stack);
    }

    response.status(status).json({
      statusCode: status,
      message: 'Erro interno no sistema, tente novamente mais tarde',
      timestamp: new Date().toISOString(),
    });
  }
}
