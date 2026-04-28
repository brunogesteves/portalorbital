import { PrismaClient, Role } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import bcrypt from 'bcryptjs';

const adapter = new PrismaMariaDb({
  host: 'localhost',
  user: 'root',
  password: 'senha123',
  database: 'orbitalpolitico',
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  const pbrPassword = await bcrypt.hash('pbr123', 10);

  // Criar Admin
  await prisma.user.upsert({
    where: { email: 'admin@portal.com' },
    update: {},
    create: {
      email: 'admin@portal.com',
      password: adminPassword,
      name: 'Administrador',
      role: Role.ADM,
    },
  });

  // Criar Publisher
  await prisma.user.upsert({
    where: { email: 'pbr@portal.com' },
    update: {},
    create: {
      email: 'pbr@portal.com',
      password: pbrPassword,
      name: 'Publicador 1',
      role: Role.PBR,
    },
  });

  // Criar Categorias de teste
  const categories = ['Política', 'Economia', 'Saúde', 'Educação'];
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat },
      update: {},
      create: { name: cat },
    });
  }

  console.log('✅ Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
