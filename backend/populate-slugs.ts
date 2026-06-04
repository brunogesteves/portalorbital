import prisma from './src/lib/prisma';

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

async function main() {
  console.log('Populando slugs para categorias...');
  const categories = await prisma.category.findMany();
  for (const cat of categories) {
    const baseSlug = slugify(cat.name || 'categoria');
    let finalSlug = baseSlug;
    let counter = 1;
    
    // Evitar colisões de slug
    while (true) {
      const existing = await prisma.category.findFirst({
        where: { slug: finalSlug, NOT: { id: cat.id } }
      });
      if (!existing) break;
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    await prisma.category.update({
      where: { id: cat.id },
      data: { slug: finalSlug }
    });
    console.log(`Categoria ID ${cat.id}: "${cat.name}" -> slug: "${finalSlug}"`);
  }

  console.log('\nPopulando slugs para posts e resolvendo títulos duplicados...');
  const posts = await prisma.post.findMany();
  const titleSet = new Set<string>();

  for (const post of posts) {
    const originalTitle = post.title || 'post';
    let finalTitle = originalTitle;
    let titleCounter = 1;

    // Garantir unicidade do título
    while (titleSet.has(finalTitle)) {
      finalTitle = `${originalTitle} (${titleCounter})`;
      titleCounter++;
    }
    titleSet.add(finalTitle);

    if (finalTitle !== post.title) {
      console.log(`Post ID ${post.id}: Título duplicado ajustado: "${post.title}" -> "${finalTitle}"`);
    }

    const baseSlug = slugify(finalTitle);
    let finalSlug = baseSlug;
    let slugCounter = 1;

    // Garantir unicidade do slug
    while (true) {
      const existing = await prisma.post.findFirst({
        where: { slug: finalSlug, NOT: { id: post.id } }
      });
      if (!existing) break;
      finalSlug = `${baseSlug}-${slugCounter}`;
      slugCounter++;
    }

    await prisma.post.update({
      where: { id: post.id },
      data: { 
        title: finalTitle,
        slug: finalSlug 
      }
    });
    console.log(`Post ID ${post.id}: "${finalTitle}" -> slug: "${finalSlug}"`);
  }

  console.log('\nPopulação concluída com sucesso!');
}

main()
  .catch(err => {
    console.error('Erro ao executar o script:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
