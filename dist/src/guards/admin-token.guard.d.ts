import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UserRepositoryInterface } from '../modules/users/repo/user.repository.interface';
export declare class AdminTokenGuard implements CanActivate {
    private readonly jwtService;
    private readonly userRepo;
    private readonly reflector;
    constructor(jwtService: JwtService, userRepo: UserRepositoryInterface, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractBearerToken;
    private decodeTokenPayload;
}
