import prisma from './src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const admPassword = await bcrypt.hash('senha_adm_123', 10);
  const pbrPassword = await bcrypt.hash('senha_pbr_123', 10);

  const userAdm = await prisma.user.upsert({
    where: { email: 'novo_adm@example.com' },
    update: {},
    create: {
      name: 'Novo ADM',
      email: 'novo_adm@example.com',
      password: admPassword,
      role: 'ADM',
    },
  });

  const userPbr = await prisma.user.upsert({
    where: { email: 'novo_pbr@example.com' },
    update: {},
    create: {
      name: 'Novo PBR',
      email: 'novo_pbr@example.com',
      password: pbrPassword,
      role: 'PBR',
    },
  });

  console.log('--- Usuários Criados ---');
  console.log(`Email: ${userAdm.email} | Senha: senha_adm_123 | Role: ${userAdm.role}`);
  console.log(`Email: ${userPbr.email} | Senha: senha_pbr_123 | Role: ${userPbr.role}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
