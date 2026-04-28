import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const prismaClientSingleton = () => {
  // Parsing DATABASE_URL: mysql://root:senha123@localhost/orbitalpolitico
  // Simplificado para o spec fornecido
  const adapter = new PrismaMariaDb({
    host: 'localhost',
    user: 'root',
    password: 'senha123',
    database: 'orbitalpolitico',
  });
  
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
