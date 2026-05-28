import { JwtService } from '@nestjs/jwt';

export function generateAdminToken(jwtService: JwtService): string {
  return jwtService.sign({
    id: 'admin-id',
    name: 'Admin Test',
    email: 'admin@test.com',
    role: 'admin',
  });
}

export function generateUserToken(jwtService: JwtService): string {
  return jwtService.sign({
    id: 'user-id',
    name: 'User Test',
    email: 'user@test.com',
    role: 'user',
  });
}
