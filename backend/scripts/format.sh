#!/bin/bash
# Script para formatar o código e remover linhas vazias consecutivas

# Roda Prettier
npx prettier --write .

# Remove múltiplas linhas vazias consecutivas (mantém no máximo 1)
# Remove linhas vazias no início e fim do arquivo
find src prisma -name "*.ts" -o -name "*.js" | while read -r file; do
  awk '
    # Pular linhas vazias no início
    !NF && !started { next }
    NF { started=1 }
    # Guardar linhas para detectar múltiplas vazias
    { lines[NR] = $0 }
  ' "$file" > /dev/null 2>&1
  
  # Método mais simples: usar awk para manter apenas 1 linha vazia consecutiva
  awk '
    BEGIN { prev_empty = 0 }
    /^$/ { 
      if (prev_empty) next
      prev_empty = 1
      print
      next
    }
    { prev_empty = 0; print }
  ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
done

echo "✅ Formatação concluída!"
