import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import request from 'supertest';
import * as bcrypt from 'bcrypt';

import { AuthModule } from '../src/modules/auth/auth.module';
import { SecurityModule } from '../src/modules/security/security.module';
import { UserModule } from '../src/modules/Users/user.module';
import { UserRepositoryInterface } from '../src/modules/Users/repo/user.repository.interface';
import { SettingsRepositoryInterface } from '../src/modules/settings/repo/settings.repository';
import { MockSettingsRepository } from '../src/modules/settings/repo/mock-settings.repository';
import { MockUserRepository } from './helpers/mock-user.repository';
import { generateAdminToken } from './helpers/auth.helper';

describe('Módulo de Autenticação', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  async function createAppWithHashedPassword(): Promise<{
    app: INestApplication;
    jwtService: JwtService;
  }> {
    const hashedPassword = await bcrypt.hash('123456', 10);

    class MockUserRepoWithHash extends MockUserRepository {
      constructor() {
        super();
        this.updatePasswordHash('admin@test.com', hashedPassword);
      }
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [
            () => ({
              security: {
                jwtAccessSecret: 'test-secret',
                jwtAccessExpiresIn: '55m',
                jwtRefreshSecret: 'test-refresh-secret',
                jwtRefreshExpiresIn: '15d',
              },
            }),
          ],
        }),
        JwtModule.register({
          global: true,
          secret: 'test-secret',
          signOptions: { expiresIn: '55m' },
        }),
        SecurityModule,
        UserModule,
        AuthModule,
      ],
    })
      .overrideProvider(UserRepositoryInterface)
      .useClass(MockUserRepoWithHash)
      .overrideProvider(SettingsRepositoryInterface)
      .useClass(MockSettingsRepository)
      .compile();

    const app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();

    const jwtService = moduleFixture.get<JwtService>(JwtService);
    return { app, jwtService };
  }

  beforeAll(async () => {
    const result = await createAppWithHashedPassword();
    app = result.app;
    jwtService = result.jwtService;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/signin', () => {
    it('deve autenticar com credenciais corretas e retornar 200 com tokens', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email: 'admin@test.com', password: '123456' })
        .expect(201);

      expect(res.body.accessToken).toBeDefined();
      expect(res.body.refreshToken).toBeDefined();
      expect(res.body.user).toBeDefined();
      expect(res.body.user.email).toBe('admin@test.com');
    });

    it('deve rejeitar senha incorreta com 401', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email: 'admin@test.com', password: 'wrong-password' })
        .expect(401);
    });

    it('deve rejeitar email inexistente com 401', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email: 'naoexiste@test.com', password: '123456' })
        .expect(401);
    });

    it('deve rejeitar body inválido (campo faltando) com 400', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email: 'admin@test.com' })
        .expect(400);
    });

    it('deve rejeitar email inválido com 400', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email: 'invalido', password: '123456' })
        .expect(400);
    });
  });

  describe('POST /auth/refreshtoken', () => {
    it('deve renovar token com refresh token válido e retornar 200', async () => {
      const signinRes = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email: 'admin@test.com', password: '123456' })
        .expect(201);

      const refreshToken = signinRes.body.refreshToken;

      const res = await request(app.getHttpServer())
        .post('/auth/refreshtoken')
        .send({ refreshToken })
        .expect(201);

      expect(res.body.accessToken).toBeDefined();
    });

    it('deve rejeitar refresh token inválido com 401', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/refreshtoken')
        .send({ refreshToken: 'invalid-token' })
        .expect(401);
    });

    it('deve rejeitar refresh token expirado com 401', async () => {
      const expiredToken = jwtService.sign(
        { id: 'admin-id', name: 'Admin', role: 'admin' },
        { secret: 'test-refresh-secret', expiresIn: '0s' },
      );

      const res = await request(app.getHttpServer())
        .post('/auth/refreshtoken')
        .send({ refreshToken: expiredToken })
        .expect(401);
    });
  });
});
