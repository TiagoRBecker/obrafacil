import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { UserRepositoryInterface } from '../modules/Users/repo/user.repository.interface';
export declare class AdminTokenGuard implements CanActivate {
    private readonly configService;
    private readonly userRepo;
    private readonly reflector;
    constructor(configService: ConfigService, userRepo: UserRepositoryInterface, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractBearerToken;
    private decodeTokenPayload;
}
