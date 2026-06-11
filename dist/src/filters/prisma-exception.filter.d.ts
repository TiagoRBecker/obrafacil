import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
type PrismaException = Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientInitializationError | Prisma.PrismaClientUnknownRequestError | Prisma.PrismaClientValidationError | Prisma.PrismaClientRustPanicError;
export declare class PrismaExceptionFilter extends BaseExceptionFilter {
    private readonly logger;
    catch(exception: PrismaException, host: ArgumentsHost): void;
}
export {};
