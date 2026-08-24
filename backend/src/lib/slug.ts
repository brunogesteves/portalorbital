export const slugify = (text: string) =>
  text
    .toString()
    .normalize("NFD") // Remove acentos
    .replace(/[\u0300-\u036f]/g, "") // Remove marcas de acentuação
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Espaços -> hífen
    .replace(/-+/g, "-"); // Evita hífens duplicados
