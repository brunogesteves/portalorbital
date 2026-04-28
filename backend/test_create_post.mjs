import fs from 'fs';
import { Blob } from 'buffer';

async function runTest() {
  try {
    console.log('1. Realizando login...');
    const loginRes = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@portal.com', password: 'admin123' })
    });
    
    const cookies = loginRes.headers.get('set-cookie');
    if (!cookies) {
      console.log('Login falhou, sem cookies');
      return;
    }
    console.log('Login efetuado!');
    
    // 2. Upload da imagem interna (lua.png)
    console.log('2. Enviando imagem lua.png para o editor...');
    const imgData = new FormData();
    const luaBuffer = fs.readFileSync('../test_images/lua.png');
    imgData.append('image', new Blob([luaBuffer], { type: 'image/png' }), 'lua.png');
    
    const uploadRes = await fetch('http://localhost:3001/api/posts/upload-image', {
      method: 'POST',
      headers: { Cookie: cookies },
      body: imgData
    });
    const uploadJson = await uploadRes.json();
    console.log('Upload da lua.png sucesso! URL:', uploadJson.url);
    
    // 3. Obter Categoria Tecnologia
    console.log('3. Buscando ID da categoria Tecnologia...');
    const catRes = await fetch('http://localhost:3001/api/categories', {
      headers: { Cookie: cookies }
    });
    const categories = await catRes.json();
    const techCat = categories.find(c => c.name === 'Tecnologia');
    if (!techCat) {
      console.error('Categoria Tecnologia não encontrada!');
      return;
    }
    
    // 4. Criar Post
    console.log('4. Criando Post...');
    const postData = new FormData();
    postData.append('title', 'Viagem da Artemis');
    postData.append('categoryId', techCat.id.toString());
    postData.append('scheduledAt', new Date().toISOString());
    
    const content = `A missão Artemis marca um novo capítulo na exploração espacial, levando a humanidade de volta à Lua após mais de meio século desde as últimas viagens do programa Apollo. Mais do que apenas repetir um feito histórico, a viagem da Artemis representa um avanço tecnológico e científico, com o objetivo de estabelecer uma presença humana sustentável no satélite natural da Terra.\n<br/>\n<img src="${uploadJson.url}" alt="Lua" />\n<br/>\nA jornada começa com o lançamento do poderoso foguete Space Launch System (SLS), que transporta a cápsula Orion...`;
    postData.append('content', content);
    
    const espBuffer = fs.readFileSync('../test_images/espaconave.png');
    postData.append('thumbnail', new Blob([espBuffer], { type: 'image/png' }), 'espaconave.png');

    const createRes = await fetch('http://localhost:3001/api/posts', {
      method: 'POST',
      headers: { Cookie: cookies },
      body: postData
    });
    
    const postJson = await createRes.json();
    console.log('Post criado com sucesso! Status:', createRes.status);
    console.log('Detalhes do Post:', postJson);
    
  } catch (error) {
    console.error('Erro no teste:', error);
  }
}

runTest();
