import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class WebhookGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    this.validateSecret(request);
    this.validateIp(request);

    return true;
  }

  private validateSecret(request: Request): void {
    const expected = this.configService.get<string>('evo.apiKey');
    const received = request.headers['x-webhook-secret'];

    if (!received || received !== expected) {
      throw new UnauthorizedException('Webhook secret inválido');
    }
  }

  private validateIp(request: Request): void {
    const allowedIps = this.configService.get<string>('evo.allowedIps');

    if (!allowedIps) return;

    const ips = allowedIps.split(',').map((ip) => ip.trim());
    const clientIp = request.ip || request.socket?.remoteAddress;

    if (!clientIp || !ips.includes(clientIp)) {
      throw new UnauthorizedException(`IP não autorizado: ${clientIp}`);
    }
  }
}
