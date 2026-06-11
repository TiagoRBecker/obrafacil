import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import request from 'supertest';

import { BudgetsModule } from '../src/modules/budgets/budgets.module';
import { CustomersModule } from '../src/modules/customers/customers.module';
import { UserModule } from '../src/modules/users/user.module';
import { SecurityModule } from '../src/modules/security/security.module';
import { AuthModule } from '../src/modules/auth/auth.module';
import { SharedModule } from '../src/modules/Shared/shared.module';
import { SettingsModule } from '../src/modules/settings/settings.module';

import { BudgetRepositoryInterface } from '../src/modules/budgets/repo/budget.repository.interface';
import { CustomerRepositoryInterface } from '../src/modules/customers/repo/customer-repository.interface';
import { UserRepositoryInterface } from '../src/modules/users/repo/user.repository.interface';
import { SettingsRepositoryInterface } from '../src/modules/settings/repo/settings.repository';
import { InMemorySettingsRepository } from '../src/modules/settings/repo/in-memory-settings.repository';
import { InMemoryUserRepository } from '../src/modules/users/repo/in-memory-user.repository';
import { InMemoryCustomerRepository } from '../src/modules/customers/repo/in-memory-customer.repository';
import { InMemoryBudgetRepository } from '../src/modules/budgets/repo/in-memory-budget.repository';
import { generateAdminToken, generateUserToken } from './helpers/auth.helper';

import { JwtService } from '@nestjs/jwt';
import { BudgetEntity } from '../src/modules/budgets/entity/budget.entity';
import { CustomerEntity } from '../src/modules/customers/entity/customer.entity';
import { TypeCharge } from '../src/modules/budgets/dto/create-budget.dto';

describe('Módulo de Orçamentos', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let adminToken: string;
  let userToken: string;
  let budgetRepo: InMemoryBudgetRepository;
  let customerRepo: InMemoryCustomerRepository;

  beforeAll(async () => {
    const userRepo = new InMemoryUserRepository({
      'admin@test.com': {
        id: 'admin-id',
        name: 'Admin Test',
        email: 'admin@test.com',
        role: 'admin',
        password: '',
        permissions: [
          'order:create', 'order:read', 'order:update', 'order:delete',
          'customer:create', 'customer:read', 'customer:update', 'customer:delete',
          'team:create', 'team:read', 'team:update',
          'settings:create', 'settings:read', 'settings:update',
        ],
      },
      'user@test.com': {
        id: 'user-id',
        name: 'User Test',
        email: 'user@test.com',
        role: 'user',
        password: '',
        permissions: ['order:read', 'customer:read', 'team:read', 'settings:read'],
      },
    });

    const customerRepoImpl = new InMemoryCustomerRepository();
    await customerRepoImpl.create(CustomerEntity.toDTO({
      id: 'customer-1',
      name: 'Roberto Almeida',
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123',
      service: 'Nome do servico',
      city: 'Cidade',
    }));

    const budgetRepoImpl = new InMemoryBudgetRepository();
    await budgetRepoImpl.create(BudgetEntity.toDTO({
      id: 'budget-1',
      name: 'Roberto Almeida',
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123',
      observations: 'Client prefers morning visits',
      title: 'Residential Electrical Installation',
      description: 'Complete electrical installation for a 120m² residence.',
      initDate: new Date('2026-03-01'),
      endDate: new Date('2026-03-30'),
      validityDate: new Date('2026-04-05'),
      typeCharge: 'HORA',
      estimatedHours: 16,
      valueHour: 120,
      numberEmployees: 2,
      totalValue: 123,
      laborValue: 123,
      materialValue: 123,
      customerId: 'customer-1',
      materials: [{ name: 'Circuit breaker', unit: 'un', quantity: 4, unitPrice: 35 }],
      discount: 50,
      finalObservations: 'Payment in two installments.',
      createdAt: new Date('2026-03-01'),
    }));

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
        BudgetsModule,
      ],
    })
      .overrideProvider(UserRepositoryInterface)
      .useValue(userRepo)
      .overrideProvider(SettingsRepositoryInterface)
      .useClass(InMemorySettingsRepository)
      .overrideProvider(BudgetRepositoryInterface)
      .useValue(budgetRepoImpl)
      .overrideProvider(CustomerRepositoryInterface)
      .useValue(customerRepoImpl)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);
    budgetRepo = moduleFixture.get<InMemoryBudgetRepository>(BudgetRepositoryInterface);
    customerRepo = moduleFixture.get<InMemoryCustomerRepository>(CustomerRepositoryInterface);

    adminToken = generateAdminToken(jwtService);
    userToken = generateUserToken(jwtService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /admin/budgets/create', () => {
    const validBudget = {
      name: 'Maria Oliveira',
      phone: '(11) 99999-8888',
      address: 'Rua das Flores, 123',
      observations: 'Cliente referenciado pelo João',
      title: 'Reforma do banheiro',
      description: 'Reforma completa incluindo troca de revestimentos',
      valueHour: 85,
      estimatedHours: 40,
      numberEmployees: 2,
      typeCharge: TypeCharge.SERVICO,
      materials: [{ name: 'Cimento', unit: 'saco', quantity: 10, unitPrice: 32.5 }],
      initDate: '2026-06-01',
      endDate: '2026-06-30',
      validityDate: '2026-07-15',
      customerId: 'customer-1',
      discount: 150,
      finalObservations: 'Orçamento válido por 30 dias',
      laborValue: 3400,
      materialValue: 1200,
      totalValue: 4450,
    };

    it('deve criar orçamento com token ADMIN → 201', async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/budgets/create')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validBudget)
        .expect(201);

      expect(res.body).toBeDefined();
    });

    it('deve rejeitar criação sem token → 401', async () => {
      await request(app.getHttpServer())
        .post('/admin/budgets/create')
        .send(validBudget)
        .expect(401);
    });

    it('deve rejeitar criação com token USER (sem permissão order:create) → 401', async () => {
      await request(app.getHttpServer())
        .post('/admin/budgets/create')
        .set('Authorization', `Bearer ${userToken}`)
        .send(validBudget)
        .expect(401);
    });

    it('deve rejeitar criação com body inválido → 400', async () => {
      await request(app.getHttpServer())
        .post('/admin/budgets/create')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Incomplete' })
        .expect(400);
    });
  });

  describe('GET /admin/budgets/all', () => {
    it('deve listar orçamentos paginados com token ADMIN → 200', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/budgets/all')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('total');
      expect(res.body).toHaveProperty('page');
      expect(res.body).toHaveProperty('limit');
      expect(res.body).toHaveProperty('totalPages');
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('deve listar orçamentos com token USER → 200', async () => {
      await request(app.getHttpServer())
        .get('/admin/budgets/all')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });

    it('deve rejeitar listagem sem token → 401', async () => {
      await request(app.getHttpServer())
        .get('/admin/budgets/all')
        .expect(401);
    });
  });

  describe('GET /admin/budgets/:id', () => {
    it('deve buscar orçamento por ID existente → 200', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/budgets/budget-1')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body).toBeDefined();
    });

    it('deve retornar 404 para ID inexistente', async () => {
      await request(app.getHttpServer())
        .get('/admin/budgets/non-existent-id')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });
  });

  describe('PATCH /admin/budgets/update/:id', () => {
    it('deve atualizar orçamento com token ADMIN → 200', async () => {
      const res = await request(app.getHttpServer())
        .patch('/admin/budgets/update/budget-1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Maria Oliveira Atualizada',
          phone: '(11) 99999-8888',
          address: 'Rua das Flores, 123',
          observations: 'Observação atualizada',
          title: 'Reforma do banheiro',
          description: 'Descrição atualizada',
          valueHour: 100,
          estimatedHours: 30,
          numberEmployees: 2,
          typeCharge: TypeCharge.SERVICO,
          materials: [{ name: 'Cimento', unit: 'saco', quantity: 5, unitPrice: 35 }],
          initDate: '2026-06-01',
          endDate: '2026-06-30',
          validityDate: '2026-07-15',
          customerId: 'customer-1',
          finalObservations: 'Atualizado',
          laborValue: 3000,
          materialValue: 1000,
          totalValue: 3850,
        })
        .expect(200);
    });

    it('deve rejeitar atualização sem token → 401', async () => {
      await request(app.getHttpServer())
        .patch('/admin/budgets/update/budget-1')
        .send({ name: 'Sem token' })
        .expect(401);
    });
  });

  describe('DELETE /admin/budgets/delete/:id', () => {
    it('deve excluir orçamento com token ADMIN → 200', async () => {
      const res = await request(app.getHttpServer())
        .delete('/admin/budgets/delete/budget-1')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.deleted).toBe(true);
    });

    it('deve rejeitar exclusão sem token → 401', async () => {
      await request(app.getHttpServer())
        .delete('/admin/budgets/delete/non-existent')
        .expect(401);
    });
  });
});
