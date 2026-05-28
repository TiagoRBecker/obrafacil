import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../../decorators';
import { UserRepositoryInterface } from '../modules/users/repo/user.repository.interface';

interface AdminTokenPayload {
  id: string;
  name: string;
  role: string;
  settingsId: string | null;
}

@Injectable()
export class AdminTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepositoryInterface,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractBearerToken(request);
  

    if (!token) {
      throw new UnauthorizedException('Missing authorization token.');
    }

    const payload = this.decodeTokenPayload(token);
    
  
    if (!payload) {
      throw new UnauthorizedException('Admin access only.');
    }

    const userHavePermission = await this.userRepo.findById(payload.id);
  
    if (!userHavePermission) throw new UnauthorizedException('Acesso negado ');

    const userPermissions =
      userHavePermission?.permission?.map((rp) => rp) ?? [];
    const hasAll = requiredPermissions?.every((p) =>
      userPermissions.includes(p),
    );
  
    if (!hasAll)
      throw new UnauthorizedException('Acesso somente  para adminstradores ');
    request.user = userHavePermission.id;

    return true;
  }

  private extractBearerToken(request: Request): string | null {
    const authorization = request.headers.authorization;

    if (!authorization) {
      return null;
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer' || !token) {
      return null;
    }

    return token;
  }

  private decodeTokenPayload(token: string): AdminTokenPayload | null {
    try {
      const payload = this.jwtService.verify<AdminTokenPayload>(token);

      if (
        typeof payload.id !== 'string' ||
        typeof payload.name !== 'string' ||
        typeof payload.role !== 'string'
      ) {
        return null;
      }

      return {
        id: payload.id,
        name: payload.name,
        role: payload.role,
        settingsId: payload?.settingsId as string | null,
      };
    } catch {
      return null;
    }
  }
}
