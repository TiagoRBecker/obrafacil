# Sistema de Orçamentos - Backend

API RESTful para gestão de orçamentos, construída com NestJS e PostgreSQL.

## Tecnologias

- **NestJS** - Framework Node.js progressivo
- **Prisma** - ORM com PostgreSQL
- **TypeScript** - Linguagem tipada
- **JWT** - Autenticação
- **React PDF** - Geração de PDFs

## Funcionalidades

- **Autenticação**: Login, registro, refresh tokens
- **Orçamentos**: CRUD completo, atualização de status
- **Clientes**: Gestão de clientes e contatos
- **Equipe**: Membros da equipe com atribuição a orçamentos
- **Configurações**: Dados da empresa para geração de PDFs
- **WhatsApp**: Integração com API de mensagens
- **Geração de PDF**: Propostas formatadas em PDF

## Estrura do Banco de Dados

- `Account` - Usuários do sistema
- `Customer` - Clientes
- `Order` - Orçamentos
- `OrderMaterial` - Materiais dos orçamentos
- `Team` - Membros da equipe
- `TeamOrder` - Relação equipe/orçamento
- `Settings` - Configurações da empresa
- `Role` / `Permission` - Controle de acesso (RBAC)

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` com as variáveis necessárias (veja `.env.example`).

## Commands

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm run start:prod

# Prisma
npm run prisma:generate   # Gera o client
npm run prisma:migrate    # Executa migrações
npm run prisma:studio     # Interface visual
npm run db:seed           # Popula banco de dados

# Testes
npm run test             # Unit tests
npm run test:e2e         # E2E tests

# Linting
npm run lint
npm run format
```

## status: Em desenvolvimento

Funcionalidades sendo implementadas gradualmente.