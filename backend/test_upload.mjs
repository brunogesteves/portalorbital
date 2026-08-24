import fs from "fs";
import { Blob } from "buffer";

async function runTest() {
  try {
    // 1. Login
    const loginRes = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@portal.com", password: "admin123" }),
    });

    const cookies = loginRes.headers.get("set-cookie");
    if (!cookies) {
      console.log("Login falhou, sem cookies");
      return;
    }

    // 2. Upload Image
    const formData = new FormData();
    const buffer = fs.readFileSync("../test_images/espaconave.png");
    formData.append("image", new Blob([buffer], { type: "image/png" }), "espaconave.png");

    const uploadRes = await fetch("http://localhost:3001/api/posts/upload-image", {
      method: "POST",
      headers: {
        Cookie: cookies,
      },
      body: formData,
    });

    const data = await uploadRes.json();
    console.log("Upload HTTP Status:", uploadRes.status);
    console.log("Upload Data:", data);
  } catch (error) {
    console.error("Erro no teste:", error);
  }
}

runTest();
