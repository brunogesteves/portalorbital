# 🎠 Sugestões — Slider & Imagens

> Arquivo de referência para melhorias futuras no componente Slider e upload de imagens.

---

## 📐 1. Proporção Ideal das Imagens

### Slider (`frontend/src/components/Header/Slider/Slider.tsx`)

| Layout | Proporção | Resolução Recomendada | Mínimo Aceitável |
|--------|-----------|----------------------|------------------|
| **Desktop** (`hidden md:block`) | 16:9 | **1920 x 1080 px** (Full HD) | 1280 x 720 px |
| **Mobile** (`block md:hidden`) | 16:9 | **1280 x 720 px** (HD 720p) | 800 x 450 px |

### Por que 16:9?
- O componente usa `aspect-video` que equivale a **16:9**
- O container desktop usa `max-w-screen-2xl` (1536px), então 1920x1080 cobre com folga
- `object-cover` faz crop automático — fotos fora de proporção perdem partes importantes

### Dica de Upload
> ⚠️ Sempre envie fotos **já cortadas em 16:9** antes de fazer upload.

---

## 🛠️ 2. Sugestões de Implementação

### 2.1 Validar Proporção no Upload (Admin)

**Onde:** `admin/src/components/posts/Thumbnail.tsx` ou componente de upload

**Como fazer:**
```tsx
// No handler de upload, antes de enviar:
const checkAspectRatio = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const ratio = img.width / img.height;
      const targetRatio = 16 / 9; // 1.778
      const tolerance = 0.05; // 5% de tolerância
      resolve(Math.abs(ratio - targetRatio) < tolerance);
    };
  });
};

// Uso:
const isValid = await checkAspectRatio(selectedFile);
if (!isValid) {
  alert("A imagem deve ter proporção 16:9. Recortes importantes podem ser cortados.");
  return;
}
```

**Prioridade:** 🟡 Média

---

### 2.2 Otimizar Imagens Automaticamente (WebP + Responsivo)

**Onde:** Backend (`backend/src/controllers/post.controller.ts`) ou frontend antes do upload

**Opções:**
1. **Frontend (mais simples):** Usar `browser-image-compression`
   ```bash
   yarn add browser-image-compression
   ```

2. **Backend (melhor para produção):** Usar `sharp`
   ```bash
   yarn add sharp
   ```

**Exemplo com `sharp` no backend:**
```ts
import sharp from "sharp";

const optimized = await sharp(file.buffer)
  .resize(1920, 1080, { fit: "cover" }) // Força 16:9
  .webp({ quality: 80 })
  .toBuffer();
```

**Tamanhos sugeridos para geração:**
| Variante | Largura | Altura | Uso |
|----------|---------|--------|-----|
| `thumb` | 400px | 225px | Cards, listas |
| `medium` | 800px | 450px | Mobile slider |
| `large` | 1920px | 1080px | Desktop slider |

**Prioridade:** 🔴 Alta (melhora performance e SEO)

---

### 2.3 Crop Guide no Upload (Admin)

**Onde:** `admin/src/components/posts/Thumbnail.tsx`

**Como fazer:**
```tsx
// Adicionar overlay visual no preview da imagem
<div className="relative">
  <img src={preview} alt="Preview" className="w-full" />
  {/* Guia 16:9 */}
  <div className="absolute inset-0 border-2 border-dashed border-white/50 pointer-events-none">
    <div className="absolute top-0 left-0 right-0 h-[12.5%] bg-black/30" /> {/* Top crop */}
    <div className="absolute bottom-0 left-0 right-0 h-[12.5%] bg-black/30" /> {/* Bottom crop */}
  </div>
  <span className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
    Proporção: 16:9
  </span>
</div>
```

**Prioridade:** 🟡 Média

---

## 📋 Checklist de Implementação

- [ ] **1.1** Adicionar validação de proporção no upload do admin
- [ ] **1.2** Gerar variantes de tamanho (thumb, medium, large) automaticamente
- [ ] **1.3** Converter uploads para WebP no backend
- [ ] **1.4** Adicionar crop guide visual no componente de upload
- [ ] **1.5** Migrar imagens existentes para 16:9 e WebP

---

## 📊 Impacto Estimado

| Melhoria | SEO | Performance | UX |
|----------|-----|-------------|-----|
| Validar proporção | ✅ | ✅ | ✅ |
| Gerar variantes | ✅✅ | ✅✅ | ✅ |
| Converter para WebP | ✅ | ✅✅✅ | ✅ |
| Crop guide visual | — | — | ✅✅ |
