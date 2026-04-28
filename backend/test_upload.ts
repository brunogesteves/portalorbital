import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

async function runTest() {
  try {
    // 1. Login
    const loginRes = await axios.post('http://localhost:3001/api/auth/login', {
      email: 'admin@portal.com',
      password: 'admin123' // Supondo que a senha seja admin123
    });
    
    const cookies = loginRes.headers['set-cookie'];
    if (!cookies) {
      console.log('Login falhou, sem cookies');
      return;
    }
    
    // 2. Upload Image
    const form = new FormData();
    form.append('image', fs.createReadStream('../test_images/espaconave.png'));
    
    const uploadRes = await axios.post('http://localhost:3001/api/posts/upload-image', form, {
      headers: {
        ...form.getHeaders(),
        Cookie: cookies[0]
      }
    });
    
    console.log('Upload sucesso! URL:', uploadRes.data.url);
  } catch (error: any) {
    console.error('Erro no teste:', error.response?.data || error.message);
  }
}

runTest();
