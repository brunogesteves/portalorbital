import { PrismaClient, Role } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";
import { categories, posts } from "./content";

import dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.DATABASE_URL || "mysql://avnadmin:AVNS_IVPoafuBBXpXYm5Tv0P@mysql-14bfb7c3-orbchadb.k.aivencloud.com:26720/defaultdb?ssl-mode=REQUIRED";
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
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const pbrPassword = await bcrypt.hash("pbr123", 10);

  // Criar Admin
  await prisma.user.upsert({
    where: { email: "admin@portal.com" },
    update: {},
    create: {
      email: "admin@portal.com",
      password: adminPassword,
      name: "Administrador",
      role: Role.ADM,
    },
  });

  // Criar Publisher
  await prisma.user.upsert({
    where: { email: "pbr@portal.com" },
    update: {},
    create: {
      email: "pbr@portal.com",
      password: pbrPassword,
      name: "Publicador 1",
      role: Role.PBR,
    },
  });

  // Criar Categorias de teste
  // const categories = ["Política", "Economia", "Saúde", "Educação"];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: {
        name: cat.name,
        slug: cat.name.toLowerCase().replace(/ /g, "-"),
      },
    });
  }

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        thumbnail: post.thumbnail,
        content: post.content,
        scheduledAt: post.scheduledAt,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        status: post.status,
        categoryId: post.categoryId,
        authorId: post.authorId,
      },
    });
  }

  console.log("✅ Seed finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
