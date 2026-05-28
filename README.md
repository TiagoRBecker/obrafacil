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

Checklist do projeto — itens concluídos e pendentes.

### Qualidade do código

- [x] **Corrigir typos em nomes de arquivo** — todos os arquivos já estão com nomes corretos
- [x] **Padronizar nome dos módulos** (`Users` → `users` pra consistência)
- [x] **Corrigir permission do `SettingsController.create`** — já usa `settings:create`
- [~] **Adicionar DTO de validação** pro body do `refreshToken` — DTO existe, mas o controller ainda não o tipa
- [x] **Remover valores hardcoded**: telefone `5551995204223` e nome `Tiago Becker` do `SendMessageUseCase`
- [x] **Resolver `PdfService`** — removido o stub, criado módulo próprio
- [x] **Remover módulo vazio**: `Shared/` (avaliar se realmente necessário) — está em uso

### Arquitetura

- [x] **Migrar `jsonwebtoken` → `JwtModule`** do NestJS — 4 arquivos refatorados para usar `JwtService`
- [x] **Adicionar `.env.example`** com variáveis dummy — raiz e `infra/`
- [ ] **Adicionar paginação** nos `findAll` (customers, budgets, team)
- [x] **Adicionar ExceptionFilter global** pra erros não-Prisma — desnecessário, NestJS já trata nativamente

### Testes

- [ ] **Cobrir módulo sem teste**: whatsapp
- [~] **Adicionar ao menos um teste E2E** completo (setup existe, mas teste atual é trivial — só `GET /`)

### Extras (diferenciais)

- [x] **Swagger** (`@nestjs/swagger`) — já implementado em `/api/docs`
- [ ] **README em inglês**
- [ ] **CI/CD** (GitHub Actions com lint + test + build)

---

## Status: Em desenvolvimento

Funcionalidades sendo implementadas gradualmente.
