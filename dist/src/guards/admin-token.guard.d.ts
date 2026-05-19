import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepositoryInterface } from '../modules/auth/repo/user.repository.interface';
import { Reflector } from '@nestjs/core';
export declare class AdminTokenGuard implements CanActivate {
    private readonly configService;
    private readonly userRepo;
    private readonly reflector;
    constructor(configService: ConfigService, userRepo: UserRepositoryInterface, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractBearerToken;
    private decodeTokenPayload;
}
