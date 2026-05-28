# API de Orçamentos — Backend

> **Status: Em andamento** — Projeto em desenvolvimento ativo, funcionalidades sendo implementadas gradualmente.

API RESTful para gestão de orçamentos de serviços (elétrica, hidráulica, reformas, pintura, etc.). Construída com **NestJS** e **PostgreSQL**, com integração WhatsApp via Evolution API, geração de PDF e controle de acesso baseado em papéis (RBAC).

---

## Funcionalidades

### Implementadas
- **Autenticação** — Sign-up, sign-in e refresh token com JWT
- **RBAC** — Controle de acesso granular por permissões (`resource:action`) com papéis ADMIN e USER
- **Orçamentos** — CRUD completo com cálculo de valores (mão de obra, materiais, desconto), status e datas
- **Clientes** — Gestão cadastral com busca por telefone
- **Equipe** — Membros com cargo, status (FREE/BUSY/ON_VACATION) e atribuição a orçamentos
- **Configurações** — Dados da empresa para personalização de PDFs (nome, logotipo, prazos, garantias)
- **WhatsApp** — Criação e gerenciamento de instâncias, conexão via QR Code, webhooks para eventos
- **Envio de Orçamento** — Geração de PDF com Puppeteer + Handlebars e envio via WhatsApp
- **Tracking de Mensagens** — Rastreamento de mensagens enviadas por orderId
- **Swagger** — Documentação interativa disponível em `/api/docs`
- **Filtro Global de Exceções** — Tratamento padronizado de erros do Prisma (unique constraint, not found, FK violation)

### Implementado (Infra)
- **Testes de Integração** — 36 testes para autenticação, clientes e orçamentos usando Jest + supertest com mocks em memória

### Pendentes
- [ ] CI/CD com GitHub Actions (lint + test + build)
- [ ] Endpoint de dashboard com métricas
- [ ] Upload de logotipo para configurações da empresa
- [ ] Histórico de alterações em orçamentos

---

## Tecnologias

| Categoria | Tecnologia |
|-----------|-----------|
| **Runtime** | Node.js |
| **Framework** | NestJS 11 |
| **Linguagem** | TypeScript 5.4 |
| **ORM** | Prisma 7 + PostgreSQL |
| **Autenticação** | JWT (access + refresh tokens) via `@nestjs/jwt` |
| **Hash de Senhas** | bcrypt |
| **Validação** | class-validator + class-transformer |
| **Geração de PDF** | Puppeteer + Handlebars |
| **WhatsApp** | Evolution API (WhatsApp Baileys) |
| **Datas** | date-fns |
| **Documentação** | Swagger (`@nestjs/swagger`) |
| **Infraestrutura** | Docker Compose (PostgreSQL, Redis, Evolution API) |

---

## Estrutura do Projeto

```
src/
├── common/
│   └── dto/
│       ├── id-param.dto.ts          # Validação de UUID para parâmetros
│       └── pagination.dto.ts        # Paginação (page, limit, totalPages)
├── db/
│   └── prisma.service.ts            # Conexão com banco via Prisma
├── decorators/
│   ├── index.ts                     # @Roles() e @RequirePermissions()
│   └── types/index.ts               # Tipos de permissão (resource:action)
├── filters/
│   └── prisma-exception.filter.ts   # Filtro global de erros Prisma
├── guards/
│   ├── admin-token.guard.ts         # Guard JWT + verificação de permissões
│   └── webhook.guard.ts             # Guard para webhooks WhatsApp (API Key)
├── modules/
│   ├── auth/                        # SignIn, SignUp, RefreshToken
│   ├── users/                       # Gestão de contas (repositório + use cases)
│   ├── security/                    # Geração/validação de tokens JWT e hash bcrypt
│   ├── customers/                   # CRUD de clientes
│   ├── budgets/                     # CRUD de orçamentos + atualização de status
│   ├── team/                        # CRUD de membros da equipe
│   ├── settings/                    # Upsert de configurações da empresa
│   ├── message/                     # Envio de orçamentos via WhatsApp com PDF
│   ├── whatsapp/                    # Instâncias WhatsApp, webhooks e eventos
│   ├── evo/                         # Cliente HTTP para Evolution API
│   └── shared/                      # Providers compartilhados (PrismaService)
├── app.module.ts
├── app.controller.ts                # Health check (GET /)
└── main.ts                          # Bootstrap + Configuração Swagger
```

---

## Modelo de Dados

O banco é composto pelas seguintes tabelas:

| Modelo | Descrição |
|--------|-----------|
| **Account** | Usuários do sistema (name, email, password, roleId, settingsId) |
| **Role** | Papéis do RBAC (ADMIN, USER) |
| **Permission** | Permissões individuais (ex: `order:create`, `customer:read`) |
| **RolePermission** | Relação muitos-para-muitos entre papéis e permissões |
| **Customer** | Clientes (name, phone, address, city, service) |
| **Order** | Orçamentos (dados do serviço, valores, status, materiais, datas) |
| **OrderMaterial** | Materiais do orçamento (name, unit, quantity, unitPrice) |
| **Team** | Membros da equipe (name, jobTitle, email, phone, status) |
| **TeamOrder** | Relação muitos-para-muitos entre equipe e orçamentos |
| **Settings** | Configurações da empresa (businessName, specialty, logo, prazos) |
| **WhatsAppSession** | Sessões de conexão WhatsApp (instance, status, qrCode) |
| **MessageTracking** | Rastreamento de mensagens enviadas (orderId, messageId) |

### Comandos Prisma

```bash
npm run prisma:generate   # Gera o Prisma Client
npm run prisma:migrate    # Cria/executa migrations
npm run prisma:deploy     # Aplica migrations em produção
npm run prisma:studio     # Interface visual do banco
npm run db:seed           # Popula RBAC + dados de exemplo (dev)
npm run db:seed:prod      # Popula apenas RBAC, sem dados de teste (prod)
```

---

## API Endpoints

> **Nota:** Todas as rotas são prefixadas com `/v1/`. Exemplo: `POST /v1/auth/signin`.

### Health Check

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|-------------|
| `GET` | `/v1/` | Verificar status da API | Pública |

### Autenticação

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|-------------|
| `POST` | `/v1/auth/signin` | Realizar login (retorna access + refresh tokens) | Pública |
| `POST` | `/v1/auth/refreshtoken` | Renovar access token | Pública |

### Orçamentos (`/v1/admin/budgets`) — tag: `Orçamentos`

Protegido por `AdminTokenGuard`. Requer permissão específica.

| Método | Rota | Permissão | Papéis | Descrição |
|--------|------|-----------|--------|-----------|
| `POST` | `/v1/admin/budgets/create` | `order:create` | ADMIN | Criar orçamento |
| `GET` | `/v1/admin/budgets/all` | `order:read` | ADMIN, USER | Listar orçamentos (paginado) |
| `GET` | `/v1/admin/budgets/:id` | `order:read` | ADMIN, USER | Buscar orçamento por ID |
| `PATCH` | `/v1/admin/budgets/update/:id` | `order:update` | ADMIN | Atualizar orçamento |
| `DELETE` | `/v1/admin/budgets/delete/:id` | `order:delete` | ADMIN | Excluir orçamento |

### Clientes (`/v1/admin/customers`) — tag: `Clientes`

| Método | Rota | Permissão | Papéis | Descrição |
|--------|------|-----------|--------|-----------|
| `POST` | `/v1/admin/customers/create` | `customer:create` | ADMIN | Criar cliente |
| `GET` | `/v1/admin/customers/all` | `customer:read` | ADMIN, USER | Listar clientes (paginado) |
| `GET` | `/v1/admin/customers/:id` | `customer:read` | ADMIN, USER | Buscar cliente por ID |
| `PATCH` | `/v1/admin/customers/update/:id` | `customer:update` | ADMIN | Atualizar cliente |
| `DELETE` | `/v1/admin/customers/delete/:id` | `customer:update` | ADMIN | Excluir cliente |

### Equipe (`/v1/admin/team`) — tag: `Equipe`

| Método | Rota | Permissão | Papéis | Descrição |
|--------|------|-----------|--------|-----------|
| `POST` | `/v1/admin/team/create` | `team:create` | ADMIN | Criar membro da equipe |
| `GET` | `/v1/admin/team/all` | `team:read` | ADMIN, USER | Listar equipe (paginado) |
| `GET` | `/v1/admin/team/:id` | `team:read` | ADMIN, USER | Buscar membro por ID |
| `PATCH` | `/v1/admin/team/update/:id` | `team:update` | ADMIN | Atualizar membro |
| `DELETE` | `/v1/admin/team/delete/:id` | — | ADMIN | Excluir membro |

### Configurações (`/v1/admin/settings`) — tag: `Configurações`

| Método | Rota | Permissão | Papéis | Descrição |
|--------|------|-----------|--------|-----------|
| `POST` | `/v1/admin/settings` | `settings:update`, `settings:create` | ADMIN | Criar ou atualizar configurações da empresa |
| `GET` | `/v1/admin/settings/me` | `settings:read` | ADMIN, USER | Obter configurações da empresa do usuário logado |

### Mensagens (`/v1/admin/send`) — tag: `Mensagens`

| Método | Rota | Permissão | Papéis | Descrição |
|--------|------|-----------|--------|-----------|
| `POST` | `/v1/admin/send/message` | `order:create` | ADMIN | Gerar PDF e enviar orçamento via WhatsApp |

### WhatsApp (`/v1/instance`) — tag: `WhatsApp`

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|-------------|
| `POST` | `/v1/instance/create/connection` | Criar instância e conectar WhatsApp | Pública |
| `GET` | `/v1/instance/connection/:id/qrcode` | Obter QR Code para escanear | Pública |

### WhatsApp — Mídia (`/v1/message`) — tag: `WhatsApp`

| Método | Rota | Permissão | Descrição |
|--------|------|-----------|-----------|
| `POST` | `/v1/message/sendMedia/:instanceName` | `settings:create` | Enviar mídia via WhatsApp para instância |

### Webhook (`/v1/webhook`) — tag: `Webhook`

| Método | Rota | Segurança | Descrição |
|--------|------|-----------|-----------|
| `POST` | `/v1/webhook/message/connection-update` | `WebhookGuard` (API Key) | Receber eventos de conexão do WhatsApp |

---

## Requisitos

- **Node.js** >= 18
- **npm** >= 9
- **Docker** + **Docker Compose** (para infraestrutura local)
- **Git**

---

## Instalação e Configuração

```bash
# 1. Clone o repositório
git clone https://github.com/TiagoRBecker/obrafacil.git
cd obrafacil

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### Variáveis de Ambiente

```env
# Banco de Dados
DATABASE_URL="postgresql://order:12345@localhost:5432/order"

# JWT
JWT_ACCESS_SECRET=sua_chave_aqui
JWT_ACCESS_EXPIRES_IN=55m
JWT_REFRESH_SECRET=sua_refresh_key_aqui
JWT_REFRESH_EXPIRES_IN=15d

# Evolution API (WhatsApp)
EVO_API_KEY=sua_chave_evolution
EVO_BASE_URL=http://localhost:8080
INSTANCE_NAME=atendimento-01
WEBHOOK_URL=http://localhost:3003/v1/webhook/message/connection-update
```

### Infraestrutura (Docker)

```bash
docker compose -f infra/docker-compose.yml up -d
```

Sobe os seguintes serviços:

| Serviço | Porta | Finalidade |
|---------|-------|------------|
| PostgreSQL | 5432 | Banco de dados da aplicação |
| PostgreSQL (evo) | 5433 | Banco de dados da Evolution API |
| Redis | 6379 | Cache da Evolution API |
| Evolution API | 8080 | Gateway WhatsApp |

### Banco de Dados

```bash
# Execute as migrations
npm run prisma:migrate

# Popule com dados iniciais
npm run db:seed              # RBAC + dados de exemplo (desenvolvimento)
npm run db:seed:prod         # Apenas RBAC, sem dados de teste (produção)
```

---

## Uso

```bash
# Desenvolvimento (com hot-reload)
npm run dev

# Build
npm run build

# Produção
npm start

# Testes
npm test              # Testes de integração (36 testes)

# Lint e Formatação
npm run lint
npm run format
```

A API estará disponível em `http://localhost:3003/v1`.

Documentação Swagger: `http://localhost:3003/api/docs`.

---

## Autenticação

### Fluxo de Tokens

1. **Sign-in** → `POST /auth/signin` com email + senha → retorna `accessToken` (55min) + `refreshToken` (15d)
2. **Requisições autenticadas** → Enviar `Bearer <accessToken>` no header `Authorization`
3. **Renovação** → Quando o access token expirar, usar `POST /auth/refreshtoken` com o refresh token

### Papéis (RBAC)

| Papel | Permissões |
|-------|-----------|
| **ADMIN** | Acesso total a todos os recursos |
| **USER** | Leitura de orçamentos e clientes |

### Webhook

Webhooks da Evolution API são autenticados via header `x-webhook-secret`.

---

## Estrutura de Respostas

### Paginação

Endpoints de listagem (`/all`) retornam resposta paginada:

```json
{
  "data": [],
  "total": 50,
  "page": 1,
  "limit": 10,
  "totalPages": 5
}
```

### Erros

A API utiliza códigos HTTP padronizados:

| Código | Significado |
|--------|-------------|
| `200` | Sucesso |
| `201` | Criado com sucesso |
| `400` | Dados inválidos |
| `401` | Não autenticado |
| `403` | Sem permissão |
| `404` | Recurso não encontrado |
| `409` | Conflito (ex: email duplicado) |
| `500` | Erro interno do servidor |

---

## Licença

Distribuído sob licença MIT. Veja [LICENSE](LICENSE) para mais informações.
