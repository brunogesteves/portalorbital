#!/bin/bash
# Script para formatar o código e remover linhas vazias consecutivas

# Roda Prettier
npx prettier --write .

# Remove múltiplas linhas vazias consecutivas (mantém no máximo 1)
# Remove linhas vazias no início e fim do arquivo
find src prisma -name "*.ts" -o -name "*.js" | while read -r file; do
  awk '
    BEGIN { blank_count = 0; started = 0 }
    /^$/ {
      blank_count++
      if (blank_count <= 1 && started) print
      next
    }
    {
      if (!started) started = 1
      blank_count = 0
      print
    }
  ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
done

echo "✅ Formatação concluída!"
