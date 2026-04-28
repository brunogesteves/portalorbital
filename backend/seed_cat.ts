import prisma from './src/lib/prisma';
async function main() {
  await prisma.category.upsert({
    where: { name: 'Tecnologia' },
    update: {},
    create: { name: 'Tecnologia' },
  });
  console.log('Categoria Tecnologia criada');
}
main();
