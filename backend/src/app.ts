import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import postRoutes from "./routes/post.routes";
import searchRoutes from "./routes/search.routes";

const app = express();
// ... (middleware stays same)

// app.use(
//   cors({
//     // 1. Permite exatamente a origem da sua Vercel
//     origin: "https://orbitalportalpolitico.vercel.app",

//     // 2. Permite que cookies/sessões passem (necessário para o withCredentials: true)
//     credentials: true,

//     // 3. Libera os cabeçalhos padrão + o cabeçalho específico do ngrok
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "ngrok-skip-browser-warning",
//     ],

//     // 4. Garante que métodos comuns e o Preflight funcionem
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   }),
// );

app.use(
  cors({
    origin: true, // Aceita QUALQUER origem (incluindo localhost e ngrok)
    credentials: true, // Permite cookies/autenticação
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/search", searchRoutes);

export default app;
