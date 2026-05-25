import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class WebhookGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
  

    this.validateSecret(request);
  

    return true;
  }

  private validateSecret(request: Request): void {
    const expected = this.configService.get<string>('evo.apiKey');
    const received = request.headers['x-webhook-secret'];

    if (!received || received !== expected) {
      throw new UnauthorizedException('Webhook secret inválido');
    }
  }

  
}
