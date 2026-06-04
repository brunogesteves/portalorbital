export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

export function isValidNameOrTitle(text: string): boolean {
  // Permite letras (incluindo acentuadas), números, espaços e hífens
  const regex = /^[a-zA-Z0-9\s-À-ÿ]+$/;
  return regex.test(text);
}
