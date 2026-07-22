import * as z from 'zod';

// Schema para o Login
export const loginSchema = z.object({
  email: z.string()
    .min(1, 'O e-mail é obrigatório')
    .email('Insira um e-mail corporativo válido'),
  password: z.string()
    .min(1, 'A senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

// Schema para Criação/Edição de Posts
export const postSchema = z.object({
  title: z.string()
    .min(1, 'O título é obrigatório')
    .min(5, 'O título deve ser mais descritivo (mín. 5 caracteres)')
    .regex(/^[a-zA-Z0-9\s-À-ÿ]+$/, 'Caracteres especiais (como ?, !, @, etc.) não são permitidos'),
  content: z.string()
    .min(1, 'O conteúdo da notícia é obrigatório')
    .min(20, 'O conteúdo está muito curto'),
  categoryId: z.string().min(1, 'Selecione uma categoria'),
  scheduledAt: z.string().min(1, 'A data de publicação é obrigatória'),
  thumbnailUrl: z.string().optional(),
  slide: z.boolean(),
});
