# 🚀 Portal Político

Plataforma de conteúdo tecnológico e notícias com sistema de gerenciamento de conteúdo (CMS) completo.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)

---

## 📋 Table of Contents

- [Visão Geral](#-visão-geral)
- [Arquitetura](#-arquitetura)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API Endpoints](#-api-endpoints)
- [Desenvolvimento](#-desenvolvimento)
- [Deploy](#-deploy)
- [Licença](#-licença)

---

## 🌐 Visão Geral

O **Portal Político** é uma plataforma completa de publicação de conteúdo tecnológico com:

- **Frontend** responsivo para leitores (desktop e mobile)
- **Backend** robusto com API REST
- **Painel Admin** para gerenciamento de conteúdo

### URLs de Exemplo

| Ambiente | URL |
|----------|-----|
| Frontend | `https://orbitaltv.net` |
| Admin | `https://admin.orbitaltv.net` |
| API | `https://api.orbitaltv.net` |

---

## 🏗️ Arquitetura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Frontend     │────▶│     Backend     │────▶│     MariaDB     │
│   (Next.js)     │     │   (Express)     │     │    (Prisma)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               ▲
                               │
                        ┌─────────────────┐
                        │      Admin      │
                        │   (Next.js)     │
                        └─────────────────┘
```

---

## ✨ Funcionalidades

### 📰 Frontend (Leitor)
- Página inicial com slider de destaques
- Visualização de posts por categoria
- Busca de conteúdo
- Design responsivo (desktop/mobile)
- SEO otimizado (meta tags, JSON-LD, sitemap, robots.txt)
- Animações suaves com Framer Motion

### 🔧 Backend (API)
- Autenticação JWT (login/logout) com cookies HttpOnly
- Endpoint `/api/auth/me` para obter dados do usuário autenticado
- CRUD completo de posts
- Gerenciamento de categorias
- Upload de imagens e áudios
- Controle de status (ativo/inativo)
- Controle de destaque e slider
- Middleware de autenticação centralizado em `src/middleware/`
- Tipos compartilhados em `src/types/`

### 👨‍💼 Admin (Painel)
- Dashboard com estatísticas e sistema de avisos
- Gerenciamento de posts (criar, editar, excluir)
- Gerenciamento de categorias
- Editor de conteúdo rico (SunEditor)
- Upload de thumbnails
- Filtros e busca
- Controle de acesso por roles (ADM/PBR)
- Gerenciamento de estado com Zustand (useUIStore)
- Verificação de autenticação via endpoint `/auth/me`

---

## 🛠️ Tecnologias

### Frontend
| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Next.js | 16 | Framework React |
| React | 19 | UI Library |
| TypeScript | 5 | Tipagem estática |
| Tailwind CSS | 4 | Estilização |
| Framer Motion | 12 | Animações |
| Zustand | 5 | Gerenciamento de estado |
| Axios | 1.16 | HTTP Client |
| React Slick | 0.31 | Carousel/Slider |

### Backend
| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Express | 5 | Framework HTTP |
| Prisma | 7 | ORM |
| MariaDB | - | Banco de dados |
| JWT | 9 | Autenticação |
| bcryptjs | 3 | Hash de senhas |
| Multer | 2 | Upload de arquivos |
| cookie-parser | 1.4 | Cookies |

### Admin
| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Next.js | 16 | Framework React |
| React Hook Form | 7 | Formulários |
| Zod | 4 | Validação |
| SunEditor | 2.47 | Editor rico |
| Lucide React | 0.468 | Ícones |
| Zustand | 5 | Gerenciamento de estado |

---

## ⚙️ Pré-requisitos

- **Node.js** >= 18
- **Yarn** ou **npm**
- **MariaDB** ou **MySQL**
- **Git**

---

## 🚀 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/portalpolitico.git
cd portalpolitico
```

### 2. Configurar o Backend

```bash
cd backend

# Instalar dependências
yarn install

# Criar arquivo .env (veja seção Configuração)
cp .env.example .env

# Gerar cliente Prisma
npx prisma generate

# Rodar migrations
npx prisma migrate dev

# (Opcional) Popular banco com dados de exemplo
npx ts-node populate-slugs.ts
npx ts-node seed_cat.ts
```

### 3. Configurar o Frontend

```bash
cd ../frontend

# Instalar dependências
yarn install

# Criar arquivo .env.local
cp .env.example .env.local
```

### 4. Configurar o Admin

```bash
cd ../admin

# Instalar dependências
yarn install

# Criar arquivo .env.local
cp .env.example .env.local
```

---

## 🔐 Configuração

### Backend (.env)

```env
# Banco de dados
DATABASE_URL="mysql://user:password@localhost:3306/portalpolitico"

# JWT
JWT_SECRET="sua-chave-secreta-aqui"

# Porta do servidor
PORT=4000

# CORS
FRONTEND_URL="http://localhost:3000"
ADMIN_URL="http://localhost:3001"

# Cookie Configuration
COOKIE_SECURE=false
COOKIE_DOMAIN=localhost
```

### Frontend (.env.local)

```env
# URL da API
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

### Admin (.env.local)

```env
# URL da API
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

---

## 📁 Estrutura do Projeto

```
portalpolitico/
├── frontend/              # Frontend para leitores
│   ├── src/
│   │   ├── app/          # Rotas Next.js (App Router)
│   │   │   ├── robots.ts        # Configuração robots.txt
│   │   │   ├── sitemap.ts       # Geração dinâmica de sitemap
│   │   │   └── layout.tsx       # Layout principal
│   │   ├── components/   # Componentes React
│   │   │   ├── jsonLd.tsx       # Componente JSON-LD para SEO
│   │   │   └── ModelPages/      # Páginas de modelo
│   │   ├── utils/        # Utilitários e API
│   │   ├── store/        # Zustand store
│   │   └── styles/       # Estilos globais
│   ├── public/           # Assets estáticos
│   └── package.json
│
├── backend/               # API REST
│   ├── src/
│   │   ├── controllers/  # Lógica de negócio
│   │   │   ├── auth.controller.ts    # Autenticação
│   │   │   ├── post.controller.ts    # CRUD de posts
│   │   │   └── category.controller.ts # Categorias
│   │   ├── routes/       # Definição de rotas
│   │   │   ├── auth.routes.ts
│   │   │   ├── post.routes.ts
│   │   │   ├── category.routes.ts
│   │   │   └── search.routes.ts
│   │   ├── middleware/    # Middlewares (auth)
│   │   │   └── auth.middleware.ts    # Middleware de autenticação JWT
│   │   ├── types/        # Tipos compartilhados
│   │   │   └── index.ts             # JwtPayload e outros tipos
│   │   └── lib/          # Utilitários (Prisma, etc)
│   ├── prisma/
│   │   ├── schema.prisma # Schema do banco
│   │   └── migrations/   # Migrations
│   └── package.json
│
├── admin/                 # Painel administrativo
│   ├── src/
│   │   ├── app/          # Rotas Next.js
│   │   ├── components/   # Componentes React
│   │   │   ├── Dashboard/        # Componentes do dashboard
│   │   │   ├── Header/           # Componentes do header
│   │   │   └── UsePage.tsx       # Hook de dados da página
│   │   ├── store/        # Zustand stores
│   │   │   └── useUIStore.ts     # Estado global da UI
│   │   └── Utils/        # Utilitários
│   └── package.json
│
└── .agent/               # Agentes de IA para desenvolvimento
```

---

## 📡 API Endpoints

### Autenticação
| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/api/auth/login` | Login | ❌ |
| POST | `/api/auth/logout` | Logout | ❌ |
| GET | `/api/auth/me` | Obter dados do usuário atual | ✅ |

### Posts
| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/api/posts` | Listar posts | ✅ |
| GET | `/api/posts/allPosts` | Todos os posts | ❌ |
| GET | `/api/posts/allSlides` | Posts do slider | ❌ |
| GET | `/api/posts/:id` | Buscar post | ✅ |
| POST | `/api/posts/createpost` | Criar post | ✅ |
| PUT | `/api/posts/:id` | Atualizar post | ✅ |
| DELETE | `/api/posts/:id` | Excluir post | ✅ |
| PATCH | `/api/posts/:id/status` | Toggle status | ✅ |
| PATCH | `/api/posts/:id/slide` | Toggle slider | ✅ |
| PATCH | `/api/posts/:id/highlight` | Toggle destaque | ✅ |

### Upload
| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/api/posts/uploadImage` | Upload imagem | ✅ |
| POST | `/api/posts/upload-audio` | Upload áudio | ✅ |
| GET | `/api/posts/images` | Listar imagens | ✅ |
| DELETE | `/api/posts/images/:filename` | Excluir imagem | ✅ |

### Categorias
| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/api/categories` | Listar categorias | ✅ |
| GET | `/api/categories/front` | Categorias (front) | ❌ |
| POST | `/api/categories` | Criar categoria | ✅ (ADM) |
| DELETE | `/api/categories/:id` | Excluir categoria | ✅ (ADM) |

### Busca
| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/api/search?q=termo` | Buscar posts | ❌ |

---

## 👥 Usuários e Roles

| Role | Permissões |
|------|------------|
| **ADM** | Acesso total (criar/editar/excluir posts e categorias) |
| **PBR** | Criar e editar próprios posts |

---

## 🧪 Desenvolvimento

### Rodar em modo desenvolvimento

```bash
# Terminal 1 - Backend
cd backend
yarn dev

# Terminal 2 - Frontend
cd frontend
yarn dev

# Terminal 3 - Admin
cd admin
yarn dev
```

### Comandos úteis

```bash
# Backend
yarn lint          # Verificar lint
yarn lint:fix      # Corrigir lint
yarn format        # Formatar código

# Frontend/Admin
yarn lint          # Verificar lint
yarn build         # Build de produção
```

### Banco de Dados

```bash
# Criar migration
npx prisma migrate dev --name nome-da-migration

# Aplicar migration
npx prisma migrate deploy

# Resetar banco
npx prisma migrate reset

# Abrir Prisma Studio
npx prisma studio
```

---

## 🚢 Deploy

### Vercel (Frontend & Admin)

1. Conectar repositório no Vercel
2. Configurar project root:
   - Frontend: `frontend`
   - Admin: `admin`
3. Adicionar variáveis de ambiente
4. Deploy automático

### Backend

Recomendado para deploy:
- **Railway**
- **Render**
- **Fly.io**
- **VPS** (DigitalOcean, AWS EC2)

```bash
# Build
yarn build

# Iniciar
yarn start
```

---

## 🔒 Segurança

- ✅ Senhas hasheadas com bcrypt
- ✅ Tokens JWT com expiração (1 hora)
- ✅ Cookies HttpOnly com SameSite=Lax
- ✅ Middleware de autenticação centralizado (`src/middleware/auth.middleware.ts`)
- ✅ Validação de input
- ✅ CORS configurado
- ✅ Roles de acesso (ADM/PBR)
- ✅ Headers de segurança via Nginx

---

## 🎯 SEO

### Recursos de SEO Implementados

- **Meta Tags**: Configuração completa no layout principal
- **JSON-LD**: Dados estruturados para notícias
- **Sitemap Dinâmico**: Gerado automaticamente em `/sitemap.xml`
- **Robots.txt**: Configurado em `/robots.txt`
- **Slugs**: URLs amigáveis para todos os posts
- **Imagens Otimizadas**: Thumbnails para redes sociais

### Componente JSON-LD

```tsx
import JsonLD from '@/components/jsonLd'

// Uso em páginas
<JsonLD description="Título do post" />
```

### Sitemap Dinâmico

O sitemap é gerado automaticamente a partir dos posts do banco de dados, incluindo:
- Página inicial com prioridade máxima (1.0)
- Todos os posts com prioridade 0.8

---

## 📝 Modelos de Dados

### User
```typescript
{
  id: Int (auto-increment)
  email: String (unique)
  password: String (hashed)
  name: String?
  role: Role (ADM | PBR)
  createdAt: DateTime
}
```

### Post
```typescript
{
  id: Int (auto-increment)
  title: String (unique)
  slug: String (unique)
  thumbnail: String?
  content: LongText
  scheduledAt: DateTime
  status: Boolean (default: false)
  slide: Boolean (default: false)
  highlight: Boolean (default: false)
  categoryId: Int (FK)
  authorId: Int (FK)
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Category
```typescript
{
  id: Int (auto-increment)
  name: String (unique)
  slug: String (unique)
}
```

### JwtPayload (Tipos Backend)
```typescript
{
  id: number
  email: string
  role: string
}
```

---

## 🤖 Agentes de IA

Este projeto inclui uma pasta `.agent/agents` com agentes especializados para auxiliar no desenvolvimento:

- **orchestrator** - Coordenação multi-agente
- **frontend-specialist** - Especialista em React/Next.js
- **backend-specialist** - Especialista em APIs
- **security-auditor** - Auditoria de segurança
- **test-engineer** - Engenheiro de testes

---

## 📄 Licença

Este projeto é proprietário. Todos os direitos reservados.

---

## 👥 Equipe

Desenvolvido com ❤️ para o **Portal Político**

---

## 📞 Contato

- **Website**: [orbitaltv.net](https://orbitaltv.net)
- **Email**: contato@orbitaltv.net

---

<p align="center">
  <img src="https://img.shields.io/badge/Feito_com-Next.js-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/Feito_com-React-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Feito_com-TypeScript-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
</p>
