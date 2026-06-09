import "dotenv/config";
import app from "./app";
import cors from "cors";

app.use(
  cors({
    origin: "https://orbitalportalpolitico.vercel.app", // Permite apenas o seu frontend da Vercel
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  }),
);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});
