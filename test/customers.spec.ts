import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import request from 'supertest';

import { CustomersModule } from '../src/modules/customers/customers.module';
import { UserModule } from '../src/modules/users/user.module';
import { SecurityModule } from '../src/modules/security/security.module';
import { AuthModule } from '../src/modules/auth/auth.module';
import { SharedModule } from '../src/modules/Shared/shared.module';
import { SettingsModule } from '../src/modules/settings/settings.module';


import { CustomerRepositoryInterface } from '../src/modules/customers/repo/customer-repository.interface';
import { UserRepositoryInterface } from '../src/modules/users/repo/user.repository.interface';
import { SettingsRepositoryInterface } from '../src/modules/settings/repo/settings.repository';
import { BudgetRepositoryInterface } from '../src/modules/budgets/repo/budget.repository.interface';
import { InMemorySettingsRepository } from '../src/modules/settings/repo/in-memory-settings.repository';
import { InMemoryUserRepository } from '../src/modules/users/repo/in-memory-user.repository';
import { InMemoryCustomerRepository } from '../src/modules/customers/repo/in-memory-customer.repository';
import { InMemoryBudgetRepository } from '../src/modules/budgets/repo/in-memory-budget.repository';
import { generateAdminToken, generateUserToken } from './helpers/auth.helper';

import { CustomerEntity } from '../src/modules/customers/entity/customer.entity';
import { ServiceTypeEnum } from '../src/modules/customers/dto/create-customer.dto';

describe('Módulo de Clientes', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let adminToken: string;
  let userToken: string;
  let customerRepo: InMemoryCustomerRepository;

  beforeAll(async () => {
    const userRepo = new InMemoryUserRepository({
      'admin@test.com': {
        id: 'admin-id',
        name: 'Admin Test',
        email: 'admin@test.com',
        role: 'admin',
        passwordHash: '',
       permission: [
  { permission: { name: 'order:create' } },
  { permission: { name: 'order:read' } },
  { permission: { name: 'order:update' } },
  { permission: { name: 'order:delete' } },

  { permission: { name: 'customer:create' } },
  { permission: { name: 'customer:read' } },
  { permission: { name: 'customer:update' } },
  { permission: { name: 'customer:delete' } },

  { permission: { name: 'team:create' } },
  { permission: { name: 'team:read' } },
  { permission: { name: 'team:update' } },

  { permission: { name: 'settings:create' } },
  { permission: { name: 'settings:read' } },
  { permission: { name: 'settings:update' } },
],
      },
      'user@test.com': {
        id: 'user-id',
        name: 'User Test',
        email: 'user@test.com',
        role: 'user',
        passwordHash: '',
       permission: [
  { permission: { name: 'order:read' } },
  { permission: { name: 'customer:read' } },
  { permission: { name: 'team:read' } },
  { permission: { name: 'settings:read' } },
],
      },
    });

    const customerRepoImpl = new InMemoryCustomerRepository();
    for (const c of [
      { id: 'customer-1', name: 'Roberto Almeida', phone: '(11) 99999-9999', address: 'Rua das Flores, 123 - Sao Paulo', service: 'Nome do servico', city: 'Cidade' },
      { id: 'customer-2', name: 'Fernanda Lima', phone: '(11) 98888-7777', address: 'Av. Central, 456 - Campinas', service: 'Nome do servico', city: 'Cidade' },
    ]) {
      await customerRepoImpl.create(CustomerEntity.toDTO(c));
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
        SettingsModule,
        SharedModule,
        AuthModule,
        CustomersModule,
      ],
    })
      .overrideProvider(UserRepositoryInterface)
      .useValue(userRepo)
      .overrideProvider(SettingsRepositoryInterface)
      .useClass(InMemorySettingsRepository)
      .overrideProvider(CustomerRepositoryInterface)
      .useValue(customerRepoImpl)
      .overrideProvider(BudgetRepositoryInterface)
      .useClass(InMemoryBudgetRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);
    customerRepo = moduleFixture.get<InMemoryCustomerRepository>(CustomerRepositoryInterface);

    adminToken = generateAdminToken(jwtService);
    userToken = generateUserToken(jwtService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /admin/customers/create', () => {
    const validCustomer = {
      name: 'Novo Cliente',
      phone: '(11) 97777-6666',
      service: ServiceTypeEnum.ELECTRICAL,
      address: 'Rua Nova, 456',
      city: 'São Paulo',
    };

    it('deve criar cliente com token ADMIN → 201', async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/customers/create')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validCustomer)
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.name).toBe('Novo Cliente');
    });

    it('deve rejeitar criação sem token → 401', async () => {
      await request(app.getHttpServer())
        .post('/admin/customers/create')
        .send(validCustomer)
        .expect(401);
    });

    it('deve rejeitar criação com token USER (sem permissão customer:create) → 401', async () => {
      await request(app.getHttpServer())
        .post('/admin/customers/create')
        .set('Authorization', `Bearer ${userToken}`)
        .send(validCustomer)
        .expect(401);
    });

    it('deve rejeitar criação com body inválido → 400', async () => {
      await request(app.getHttpServer())
        .post('/admin/customers/create')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Ab' })
        .expect(400);
    });

    it('deve rejeitar telefone duplicado → 409', async () => {
      await request(app.getHttpServer())
        .post('/admin/customers/create')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Duplicado',
          phone: '(11) 99999-9999',
          service: ServiceTypeEnum.ELECTRICAL,
        })
        .expect(409);
    });
  });

  describe('GET /admin/customers/all', () => {
    it('deve listar clientes paginados com token ADMIN → 200', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/customers/all')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('total');
      expect(res.body).toHaveProperty('page');
      expect(res.body).toHaveProperty('limit');
      expect(res.body).toHaveProperty('totalPages');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('deve listar clientes com token USER → 200', async () => {
      await request(app.getHttpServer())
        .get('/admin/customers/all')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });

    it('deve rejeitar listagem sem token → 401', async () => {
      await request(app.getHttpServer())
        .get('/admin/customers/all')
        .expect(401);
    });
  });

  describe('GET /admin/customers/:id', () => {
    it('deve buscar cliente por ID existente (customer-1) → 200', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/customers/customer-1')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.id).toBe('customer-1');
      expect(res.body.name).toBe('Roberto Almeida');
    });

    it('deve buscar cliente por ID existente (customer-2) → 200', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/customers/customer-2')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.name).toBe('Fernanda Lima');
    });

    it('deve retornar 404 para ID inexistente', async () => {
      await request(app.getHttpServer())
        .get('/admin/customers/id-inexistente')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });
  });

  describe('PATCH /admin/customers/update/:id', () => {
    it('deve atualizar cliente com token ADMIN → 200', async () => {
      const res = await request(app.getHttpServer())
        .patch('/admin/customers/update/customer-1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Roberto Almeida Atualizado',
          phone: '(11) 99999-9999',
          service: ServiceTypeEnum.PLUMBING,
          address: 'Rua Atualizada, 789',
          city: 'São Bernardo',
        })
        .expect(200);

      expect(res.body.name).toBe('Roberto Almeida Atualizado');
    });

    it('deve rejeitar atualização sem token → 401', async () => {
      await request(app.getHttpServer())
        .patch('/admin/customers/update/customer-1')
        .send({ name: 'Sem token', phone: '(11) 11111-1111' })
        .expect(401);
    });
  });

  describe('DELETE /admin/customers/delete/:id', () => {
    it('deve excluir cliente com token ADMIN → 200', async () => {
      const res = await request(app.getHttpServer())
        .delete('/admin/customers/delete/customer-2')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.deleted).toBe(true);
      expect(res.body.id).toBe('customer-2');
    });

    it('deve rejeitar exclusão sem token → 401', async () => {
      await request(app.getHttpServer())
        .delete('/admin/customers/delete/customer-1')
        .expect(401);
    });
  });
});
