# Portal Politico

Plataforma de publicação de notícias políticas e tecnológicas com sistema de gerenciamento de conteúdo (CMS) completo.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)

---

## Sumario

- [Visao Geral](#visao-geral)
- [Arquitetura](#arquitetura)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Pre-requisitos](#pre-requisitos)
- [Instalacao](#instalacao)
- [Configuracao](#configuracao)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Desenvolvimento](#desenvolvimento)
- [Docker](#docker)
- [Deploy](#deploy)
- [Seguranca](#seguranca)
- [SEO](#seo)
- [Modelos de Dados](#modelos-de-dados)

---

## Visao Geral

O **Portal Politico** e uma plataforma completa de publicacao de conteudo com:

- **Frontend** responsivo para leitores (desktop e mobile)
- **Backend** robusto com API REST seguindo Clean Architecture
- **Painel Admin** para gerenciamento de conteudo

### URLs

| Ambiente | URL |
|----------|-----|
| Frontend | `orbitaltv.net` |
| Admin | `admin.orbitaltv.net` |
| API | `api.orbitaltv.net` |

---

## Arquitetura

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

### Clean Architecture (Backend)

O backend segue o padrao Clean Architecture com separacao clara de responsabilidades:

```
src/
├── controllers/    # Definicao de rotas HTTP
├── usecases/       # Logica de negocio
├── repository/     # Acesso a dados (Prisma)
├── entities/       # DTOs e formatos de dados
├── middlewares/    # Middleware de autenticacao JWT
├── types/          # Tipos TypeScript compartilhados
└── lib/            # Utilitarios (Prisma client, slug generator)
```

### Separacao View/Logic (Frontend e Admin)

Tanto o frontend quanto o admin utilizam separacao entre apresentacao e logica:

```
View/
├── Home/
│   ├── Home.view.tsx   # Componente de apresentacao
│   └── Home.logic.ts   # Logica de busca de dados
├── Slug/
│   ├── Slug.view.tsx
│   └── Slug.logic.ts
└── Search/
    ├── Search.view.tsx
    └── Search.logic.ts
```

---

## Funcionalidades

### Frontend (Leitor)
- Pagina inicial com slider de destaques
- Visualizacao de posts por categoria
- Busca de conteudo
- Player de audio para conteudo em audio
- Design responsivo (desktop/mobile)
- SEO otimizado (meta tags, JSON-LD, sitemap, robots.txt)
- Animacoes suaves com Framer Motion
- Compartilhamento em redes sociais

### Backend (API)
- Autenticacao JWT (login/logout) com cookies HttpOnly
- Endpoint `/api/auth/me` para obter dados do usuario autenticado
- CRUD completo de posts
- Gerenciamento de categorias
- Upload de imagens e audios (Multer)
- Controle de status (ativo/inativo)
- Controle de destaque e slider
- Busca full-text de posts
- Controle de acesso por roles (ADM/PBR)

### Admin (Painel)
- Dashboard com estatisticas e sistema de avisos
- Gerenciamento de posts (criar, editar, excluir)
- Gerenciamento de categorias
- Editor de conteudo rico (SunEditor)
- Upload de thumbnails e imagens
- Biblioteca de imagens
- Filtros e busca
- Controle de acesso por roles (ADM/PBR)
- Gerenciamento de estado com Zustand

---

## Tecnologias

### Frontend
| Tecnologia | Versao | Uso |
|------------|--------|-----|
| Next.js | 16 | Framework React (App Router) |
| React | 19 | UI Library |
| TypeScript | 5 | Tipagem estatica |
| Tailwind CSS | 4 | Estilizacao |
| Framer Motion | 12 | Animacoes |
| Zustand | 5 | Gerenciamento de estado |
| Axios | 1.16 | HTTP Client |
| React Slick | 0.31 | Carousel/Slider |
| React Icons | 5.6 | Icones |

### Backend
| Tecnologia | Versao | Uso |
|------------|--------|-----|
| Express | 5 | Framework HTTP |
| Prisma | 7 | ORM |
| MariaDB | - | Banco de dados |
| JWT | 9 | Autenticacao |
| bcryptjs | 3 | Hash de senhas |
| Multer | 2 | Upload de arquivos |
| cookie-parser | 1.4 | Cookies |
| dotenv | 17 | Variaveis de ambiente |

### Admin
| Tecnologia | Versao | Uso |
|------------|--------|-----|
| Next.js | 16 | Framework React (App Router) |
| React | 19 | UI Library |
| TypeScript | 5 | Tipagem estatica |
| Tailwind CSS | 3 | Estilizacao |
| React Hook Form | 7 | Formularios |
| Zod | 4 | Validacao |
| SunEditor | 2.47 | Editor rico |
| Lucide React | 0.468 | Icones |
| Zustand | 5 | Gerenciamento de estado |
| Framer Motion | 12 | Animacoes |

---

## Pre-requisitos

- **Node.js** >= 18
- **Yarn** ou npm
- **MariaDB** ou MySQL
- **Git**
- **Docker** (opcional, para rodar via containers)

---

## Instalacao

### 1. Clonar o repositorio

```bash
git clone https://github.com/seu-usuario/portalpolitico.git
cd portalpolitico
```

### 2. Configurar o Backend

```bash
cd backend

# Instalar dependencias
yarn install

# Criar arquivo .env (veja secao Configuracao)
cp .env.example .env

# Gerar cliente Prisma
npx prisma generate

# Rodar migrations
npx prisma migrate dev

# (Opcional) Popular banco com dados de exemplo
npx ts-node seed.ts
```

### 3. Configurar o Frontend

```bash
cd ../frontend

# Instalar dependencias
yarn install

# Criar arquivo .env.local
cp .env.example .env.local
```

### 4. Configurar o Admin

```bash
cd ../admin

# Instalar dependencias
yarn install

# Criar arquivo .env.local
cp .env.example .env.local
```

---

## Configuracao

### Backend (.env)

```env
# Banco de dados
DATABASE_URL="mysql://user:password@localhost:3306/portalpolitico"

# JWT
JWT_SECRET="sua-chave-secreta-aqui"

# Porta do servidor
PORT=3001

# CORS
FRONTEND_URL="http://localhost:3000"
ADMIN_URL="http://localhost:3002"

# Cookie Configuration
COOKIE_SECURE=false
COOKIE_DOMAIN=localhost
```

### Frontend (.env.local)

```env
# URL da API
NEXT_PUBLIC_API_URL="http://localhost:3001"

# URL da aplicacao
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Ambiente
NODE_ENV="development"
```

### Admin (.env.local)

```env
# URL da API
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

---

## Estrutura do Projeto

```
portalpolitico/
├── frontend/                    # Frontend para leitores
│   ├── src/
│   │   ├── app/                 # Rotas Next.js (App Router)
│   │   │   ├── [slug]/          # Pagina de post individual
│   │   │   ├── search/          # Pagina de busca
│   │   │   ├── soon/            # Pagina em breve
│   │   │   ├── layout.tsx       # Layout principal
│   │   │   ├── page.tsx         # Pagina inicial
│   │   │   ├── robots.ts        # Configuracao robots.txt
│   │   │   └── sitemap.ts       # Geracao dinamica de sitemap
│   │   ├── View/                # Separacao View/Logic
│   │   │   ├── Home/            # Home.view.tsx + Home.logic.ts
│   │   │   ├── Slug/            # Slug.view.tsx + Slug.logic.ts
│   │   │   └── Search/          # Search.view.tsx + Search.logic.ts
│   │   ├── components/          # Componentes React
│   │   │   ├── AudioPlayer/     # Player de audio
│   │   │   ├── Header/          # Header com Slider, Categories, Top
│   │   │   ├── SideBar/         # Sidebar mobile
│   │   │   ├── Footer.tsx       # Rodape
│   │   │   ├── jsonLd.tsx       # Componente JSON-LD para SEO
│   │   │   ├── ShareButton.tsx  # Botao de compartilhamento
│   │   │   └── Loading.tsx      # Componente de loading
│   │   ├── store/               # Zustand store (useStore.tsx)
│   │   └── utils/               # Utilitarios e API
│   ├── public/                  # Assets estaticos
│   └── package.json
│
├── backend/                     # API REST
│   ├── src/
│   │   ├── controllers/         # Definicao de rotas HTTP
│   │   │   ├── auth.routes.ts   # Rotas de autenticacao
│   │   │   ├── post.routes.ts   # Rotas de posts
│   │   │   ├── category.routes.ts # Rotas de categorias
│   │   │   ├── search.routes.ts # Rotas de busca
│   │   │   ├── images.routes.ts # Rotas de imagens
│   │   │   └── audio.routes.ts  # Rotas de audio
│   │   ├── usecases/            # Logica de negocio
│   │   │   ├── auth/            # Autenticacao
│   │   │   ├── post/            # CRUD de posts
│   │   │   ├── category/        # Categorias
│   │   │   ├── search/          # Busca
│   │   │   ├── images/          # Upload de imagens
│   │   │   └── audio/           # Upload de audio
│   │   ├── repository/          # Acesso a dados
│   │   │   ├── user/            # Repositorio de usuarios
│   │   │   ├── post/            # Repositorio de posts
│   │   │   ├── category/        # Repositorio de categorias
│   │   │   ├── image/           # Repositorio de imagens
│   │   │   └── search/          # Repositorio de busca
│   │   ├── entities/            # DTOs e formatos de dados
│   │   ├── middlewares/         # Middleware de autenticacao
│   │   │   └── auth.middleware.ts
│   │   ├── types/               # Tipos TypeScript
│   │   │   └── index.ts         # AuthRequest, JwtPayload
│   │   ├── lib/                 # Utilitarios
│   │   │   ├── prisma.ts        # Cliente Prisma
│   │   │   └── slug.ts          # Gerador de slug
│   │   ├── routes.ts            # Agregador de rotas
│   │   ├── app.ts               # Setup do Express
│   │   └── server.ts            # Entry point do servidor
│   ├── prisma/
│   │   ├── schema.prisma        # Schema do banco
│   │   ├── seed.ts              # Script de seed
│   │   └── migrations/          # Migrations do banco
│   └── package.json
│
├── admin/                       # Painel administrativo
│   ├── src/
│   │   ├── app/                 # Rotas Next.js
│   │   │   ├── categorias/      # Gerenciamento de categorias
│   │   │   ├── login/           # Pagina de login
│   │   │   ├── post/
│   │   │   │   ├── new/         # Criar novo post
│   │   │   │   └── edit/[id]/   # Editar post existente
│   │   │   ├── search/          # Busca de posts
│   │   │   ├── layout.tsx       # Layout principal
│   │   │   └── page.tsx         # Dashboard
│   │   ├── components/          # Componentes React
│   │   │   ├── Dashboard/       # Componentes do dashboard
│   │   │   ├── Header/          # Cabecalho com navegacao
│   │   │   ├── Sidebar/         # Menu lateral
│   │   │   ├── posts/           # Componentes de posts
│   │   │   │   ├── Editor.tsx   # Editor SunEditor
│   │   │   │   ├── Thumbnail.tsx # Upload de thumbnail
│   │   │   │   └── LibrayModal.tsx # Modal de biblioteca
│   │   │   ├── LayoutWrapper.tsx # Wrapper de layout
│   │   │   └── ModalMessage.tsx # Modal de mensagens
│   │   ├── store/               # Zustand store
│   │   │   └── useUIStore.ts    # Estado global da UI
│   │   └── Utils/               # Utilitarios
│   │       ├── api.ts           # Cliente API (axios)
│   │       ├── types.ts         # Tipos TypeScript
│   │       └── schemas.ts       # Schemas Zod
│   └── package.json
│
├── nginx/                       # Configuracao Nginx
│   └── nginx.conf               # Reverse proxy multi-dominio
│
├── docker-compose.yml           # Orquestracao Docker
├── tsconfig.json                # Configuracao TypeScript raiz
├── start.sh                     # Script de inicio rapido
└── README.md                    # Esta documentacao
```

---

## API Endpoints

### Autenticacao
| Metodo | Rota | Descricao | Autenticacao |
|--------|------|-----------|--------------|
| POST | `/api/auth/login` | Login | Nao |
| POST | `/api/auth/logout` | Logout | Nao |
| GET | `/api/auth/me` | Obter dados do usuario atual | Sim |

### Posts
| Metodo | Rota | Descricao | Autenticacao |
|--------|------|-----------|--------------|
| GET | `/api/posts` | Listar posts | Sim |
| GET | `/api/posts/allPosts` | Todos os posts | Nao |
| GET | `/api/posts/allSlides` | Posts do slider | Nao |
| GET | `/api/posts/:id` | Buscar post | Sim |
| POST | `/api/posts/createpost` | Criar post | Sim |
| PUT | `/api/posts/:id` | Atualizar post | Sim |
| DELETE | `/api/posts/:id` | Excluir post | Sim |
| PATCH | `/api/posts/:id/status` | Toggle status | Sim |
| PATCH | `/api/posts/:id/slide` | Toggle slider | Sim |
| PATCH | `/api/posts/:id/highlight` | Toggle destaque | Sim |

### Upload de Imagens
| Metodo | Rota | Descricao | Autenticacao |
|--------|------|-----------|--------------|
| POST | `/api/posts/uploadImage` | Upload imagem | Sim |
| GET | `/api/posts/images` | Listar imagens | Sim |
| DELETE | `/api/posts/images/:filename` | Excluir imagem | Sim |

### Upload de Audio
| Metodo | Rota | Descricao | Autenticacao |
|--------|------|-----------|--------------|
| POST | `/api/posts/upload-audio` | Upload audio | Sim |

### Categorias
| Metodo | Rota | Descricao | Autenticacao |
|--------|------|-----------|--------------|
| GET | `/api/categories` | Listar categorias | Sim |
| GET | `/api/categories/front` | Categorias (front) | Nao |
| POST | `/api/categories` | Criar categoria | Sim (ADM) |
| DELETE | `/api/categories/:id` | Excluir categoria | Sim (ADM) |

### Busca
| Metodo | Rota | Descricao | Autenticacao |
|--------|------|-----------|--------------|
| GET | `/api/search?q=termo` | Buscar posts | Nao |

### Imagens e Audio (via Nginx)
| Metodo | Rota | Descricao | Autenticacao |
|--------|------|-----------|--------------|
| GET | `/images/:filename` | Acessar imagem | Nao |
| GET | `/audio/:filename` | Acessar audio | Nao |

---

## Usuarios e Roles

| Role | Permissoes |
|------|------------|
| **ADM** | Acesso total (criar/editar/excluir posts e categorias) |
| **PBR** | Criar e editar proprios posts |

---

## Desenvolvimento

### Rodar em modo desenvolvimento

**Script rapido (start.sh):**

```bash
chmod +x start.sh
./start.sh
```

Isso ira iniciar os tres servicos:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`
- Admin: `http://localhost:3002`

**Manualmente (3 terminais):**

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

### Comandos uteis

```bash
# Backend
yarn lint          # Verificar lint
yarn lint:fix      # Corrigir lint
yarn format        # Formatar codigo

# Frontend/Admin
yarn lint          # Verificar lint
yarn lint:fix      # Corrigir lint
yarn build         # Build de producao
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

## Docker

### Com Docker Compose

```bash
# Construir e iniciar todos os servicos
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar todos os servicos
docker-compose down
```

### Servicos Docker

| Servico | Porta | Descricao |
|---------|-------|-----------|
| nginx | 80 | Reverse proxy |
| frontend | 3000 | Aplicacao para leitores |
| admin | 3002 | Painel administrativo |
| api | 3001 (host network) | Backend API |

### Configuracao Nginx

O Nginx configura routing por dominio:

| Dominio | Servico |
|---------|---------|
| `localhost` | Frontend |
| `admin.localhost` | Admin |
| `api.localhost` | API direta |

Rotas proxy:
- `/api/*` → Backend API
- `/images/*` → API (cache 1 dia)
- `/audio/*` → API (cache 1 dia)

---

## Deploy

### Vercel (Frontend & Admin)

1. Conectar repositorio no Vercel
2. Configurar project root:
   - Frontend: `frontend`
   - Admin: `admin`
3. Adicionar variaveis de ambiente
4. Deploy automatico

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

## Seguranca

- Senhas hasheadas com bcrypt
- Tokens JWT com expiracao (1 hora)
- Cookies HttpOnly com SameSite=Lax
- Middleware de autenticacao centralizado
- Validacao de input
- CORS configurado
- Roles de acesso (ADM/PBR)
- Headers de seguranca via Nginx
- Limite de upload: 50MB

---

## SEO

### Recursos de SEO Implementados

- **Meta Tags**: Configuracao completa no layout principal
- **JSON-LD**: Dados estruturados para noticias
- **Sitemap Dinamico**: Gerado automaticamente em `/sitemap.xml`
- **Robots.txt**: Configurado em `/robots.txt`
- **Slugs**: URLs amigaveis para todos os posts
- **Imagens Otimizadas**: Thumbnails para redes sociais

### Componente JSON-LD

```tsx
import JsonLD from '@/components/jsonLd'

// Uso em paginas
<JsonLD description="Titulo do post" />
```

### Sitemap Dinamico

O sitemap e gerado automaticamente a partir dos posts do banco de dados, incluindo:
- Pagina inicial com prioridade maxima (1.0)
- Todos os posts com prioridade 0.8

---

## Modelos de Dados

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

## Agentes de IA

Este projeto inclui uma pasta `.agent/` com agentes especializados para auxiliar no desenvolvimento:

- **orchestrator** - Coordenacao multi-agente
- **frontend-specialist** - Especialista em React/Next.js
- **backend-specialist** - Especialista em APIs
- **security-auditor** - Auditoria de seguranca
- **test-engineer** - Engenheiro de testes

---

## Contato

- **Website**: [orbitaltv.net](https://orbitaltv.net)
- **Email**: contato@orbitaltv.net

---

<p align="center">
  <img src="https://img.shields.io/badge/Feito_com-Next.js-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/Feito_com-React-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Feito_com-TypeScript-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
</p>
