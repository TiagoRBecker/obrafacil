# Orçamentos API — Backend

> Projeto de estudo/portfolio — API RESTful para gestão de orçamentos construída com **NestJS** e **PostgreSQL**, com integração WhatsApp, geração de PDF e RBAC.

## Tecnologias

- **NestJS 11** - Framework Node.js progressivo
- **Prisma 7** - ORM com PostgreSQL + adapter nativo (`@prisma/adapter-pg`)
- **TypeScript** - Linguagem tipada
- **JWT** - Autenticação com access/refresh tokens
- **bcrypt** - Hash de senhas
- **Puppeteer + Handlebars** - Geração de PDFs a partir de templates HTML
- **Evolution API** - Integração WhatsApp (envio de mensagens e mídia)
- **class-validator / class-transformer** - Validação de DTOs
- **date-fns** - Manipulação de datas
- **Docker Compose** - Infraestrutura local (PostgreSQL, Redis, Evolution API)

## Estrutura do Projeto

```
src/
├── db/                          # PrismaService (conexão com banco)
├── guards/                      # AdminTokenGuard (autenticação JWT + RBAC)
├── modules/
│   ├── auth/                    # SignIn, SignUp, RefreshToken
│   ├── Users/                   # Gestão de contas (CRUD + repositório)
│   ├── customers/               # Gestão de clientes (CRUD)
│   ├── budgets/                 # Orçamentos (CRUD + PDF)
│   ├── team/                    # Membros da equipe (CRUD)
│   ├── settings/                # Configurações da empresa
│   ├── security/                # Hash, JWT (access/refresh tokens)
│   ├── whatsapp/                # Instâncias WhatsApp, webhooks
│   ├── evo/                     # Cliente Evolution API
│   ├── message/                 # Envio de orçamentos via WhatsApp com PDF
│   └── Shared/                  # Módulo compartilhado
├── app.module.ts
└── main.ts
```

## Funcionalidades

- **Autenticação**: Sign-up, sign-in, refresh token com roles (ADMIN/USER)
- **Controle de Acesso (RBAC)**: Permissões granulares por recurso (`resource:action`) via decorators `@Roles` e `@RequirePermissions`
- **Orçamentos**: CRUD completo, atualização de status, cálculo de valores (mão de obra, materiais, desconto)
- **Clientes**: Gestão com busca por telefone, validação de unicidade
- **Equipe**: Membros com cargo, status (FREE/OCUPADO), atribuição a orçamentos
- **Configurações**: Dados da empresa para personalização de PDFs
- **WhatsApp**: Criação de instâncias, conexão via QR Code, webhooks para eventos (CONNECTION_UPDATE, QRCODE_UPDATED)
- **Envio de Orçamento**: Geração de PDF com Puppeteer + template Handlebars e envio automático via WhatsApp (Evolution API)
- **Tracking de Mensagens**: Rastreamento de mensagens enviadas por orderId

## Estrutura do Banco de Dados

- `Account` - Usuários do sistema
- `Customer` - Clientes
- `Order` - Orçamentos
- `OrderMaterial` - Materiais dos orçamentos
- `Team` / `TeamOrder` - Membros da equipe e relação com orçamentos
- `Settings` - Configurações da empresa
- `WhatsAppSession` - Sessões de conexão WhatsApp
- `MessageTracking` - Tracking de mensagens enviadas
- `Role` / `Permission` / `RolePermission` - Controle de acesso (RBAC)

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com base no exemplo em `infra/.env`:

```env
DATABASE_URL="postgresql://order:12345@localhost:5432/order"
JWT_ACCESS_SECRET=sua_chave_aqui
JWT_ACCESS_EXPIRES_IN=55m
JWT_REFRESH_SECRET=sua_refresh_key_aqui
JWT_REFRESH_EXPIRES_IN=15d
EVO_API_KEY=sua_chave_evolution
EVO_BASE_URL=http://localhost:8080
INSTANCE_NAME=atendimento-01
WEBHOOK_URL=http://localhost:3003/webhook/message/connection-update
```

### Infraestrutura (Docker)

```bash
docker compose -f infra/docker-compose.yml up -d
```

Sobe os serviços:
- PostgreSQL (porta 5432)
- PostgreSQL Evolution (porta 5433)
- Redis
- Evolution API (porta 8080)

## Comandos

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start

# Prisma
npm run prisma:generate   # Gera o client
npm run prisma:migrate    # Executa migrações
npm run prisma:deploy     # Migrações em produção
npm run prisma:studio     # Interface visual
npm run db:seed           # Popula banco de dados (RBAC + admin + settings)

# Testes
npm run test              # Unit tests
npm run test:e2e          # E2E tests

# Linting
npm run lint
npm run format
```

## API Endpoints

### Autenticação (`/auth`)
| Método | Rota          | Descrição          |
|--------|---------------|---------------------|
| POST   | `/signup`     | Registrar usuário   |
| POST   | `/signin`     | Login               |
| POST   | `/refreshtoken` | Renovar token     |

### Admin (`/admin/*`) — protegido por `AdminTokenGuard`

#### Clientes (`/admin/customers`)
| Método | Rota              | Permissão           |
|--------|-------------------|---------------------|
| POST   | `/create`         | `customer:create`   |
| PATCH  | `/update/:id`     | `customer:update`   |
| DELETE | `/delete/:id`     | `customer:delete`   |
| GET    | `/all`            | `customer:read`     |
| GET    | `/:id`            | `customer:read`     |

#### Orçamentos (`/admin/budgets`)
| Método | Rota              | Permissão         |
|--------|-------------------|-------------------|
| POST   | `/create`         | `order:create`    |
| PATCH  | `/update/:id`     | `order:update`    |
| DELETE | `/delete/:id`     | `order:delete`    |
| GET    | `/all`            | `order:read`      |
| GET    | `/:id`            | `order:read`      |

#### Equipe (`/admin/team`)
| Método | Rota              | Permissão         |
|--------|-------------------|-------------------|
| POST   | `/create`         | `team:create`     |
| PATCH  | `/update/:id`     | `team:update`     |
| DELETE | `/delete/:id`     | `team:delete`     |
| GET    | `/all`            | `team:read`       |
| GET    | `/:id`            | `team:read`       |

#### Configurações (`/admin/settings`)
| Método | Rota              | Permissão           |
|--------|-------------------|----------------------|
| POST   | `/create`         | `order:create`       |
| PATCH  | `/update/:id`     | —                    |
| GET    | `/me`             | `settings:read`      |

#### WhatsApp (`/admin/send`)
| Método | Rota              | Permissão         |
|--------|-------------------|-------------------|
| POST   | `/message`        | `order:create`    |

### Instâncias WhatsApp (`/instance`)
| Método | Rota                              | Descrição                |
|--------|-----------------------------------|--------------------------|
| POST   | `/connection`                     | Conectar instância       |
| POST   | `/create`                         | Criar instância          |
| GET    | `/connect/:instanceName`          | Obter QR Code            |
| GET    | `/connectionState/:instanceName`  | Status da conexão        |

### Webhooks (`/webhook`)
| Método | Rota                              | Descrição                     |
|--------|-----------------------------------|-------------------------------|
| POST   | `/message/connection-update`      | Eventos de conexão WhatsApp   |

## TODO — Polimento para Portfolio

Checklist do que vou ajustar durante a semana pra deixar o projeto com cara de vaga:

### Qualidade do código

- [ ] **Corrigir typos em nomes de arquivo:**
  - `delete-isntance-usecase.ts` → `delete-instance-usecase.ts`
  - `connection-instance-usecase..ts` → `connection-instance-usecase.ts`
  - `find-customer-by-phone.usecase .ts` → `find-customer-by-phone.usecase.ts`
  - `customer.repo.inteface.ts` → `customer.repo.interface.ts`
- [ ] **Padronizar nome dos módulos** (`Users` → `users` pra consistência)
- [ ] **Remover módulos vazios**: `Events/`, `templates/`, `Shared/` se não forem utilizados
- [ ] **Corrigir permission do `SettingsController.create`** (requer `order:create`, deveria ser `settings:create`)
- [ ] **Adicionar DTO de validação** pro body do `refreshToken` (atualmente `any`)
- [ ] **Remover valores hardcoded**: telefone `5551995204223` e nome `Tiago Becker` do `SendMessageUseCase`
- [ ] **Resolver `PdfService`** ou remover se não for utilizado (retorna `"ok"` sem gerar PDF)

### Arquitetura

- [ ] **Migrar `jsonwebtoken` → `JwtModule`** do NestJS (já está nas deps, só não está sendo usado)
- [ ] **Adicionar `.env.example`** com variáveis dummy (mostra que sei não versionar secrets)
- [ ] **Adicionar paginação** nos `findAll` (customers, budgets, team)
- [ ] **Adicionar ExceptionFilter global** pra erros não-Prisnia (complementar o filtro Prisma já criado)

### Testes

- [ ] **Cobrir módulos sem teste**: budgets, team, settings, whatsapp
- [ ] **Adicionar ao menos um teste E2E** completo (já tem o setup em `test/jest-e2e.json`)

### Extras (diferenciais)

- [ ] **Swagger** (`@nestjs/swagger`) — documentação automática da API
- [ ] **README em inglês** — alcance internacional
- [ ] **CI/CD** (GitHub Actions com lint + test + build)

---

## Status: Em desenvolvimento

Funcionalidades sendo implementadas gradualmente.
