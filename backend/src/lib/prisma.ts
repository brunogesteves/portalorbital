import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const prismaClientSingleton = () => {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL environment variable is not defined");
  }

  const url = new URL(dbUrl);
  const isSsl = url.searchParams.get("ssl-mode") === "REQUIRED" || url.searchParams.get("ssl") === "true";

  const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: url.port ? parseInt(url.port) : 3306,
    user: url.username,
    password: decodeURIComponent(url.password),
    database: url.pathname.substring(1),
    ssl: isSsl ? { rejectUnauthorized: false } : undefined,
    connectTimeout: 10000,
    acquireTimeout: 30000,
    connectionLimit: 20,
    keepAliveDelay: 60000,
  });
  
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
