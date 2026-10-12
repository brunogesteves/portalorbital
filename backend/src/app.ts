import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import routes from "./routes";

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL!, process.env.ADMIN_URL!],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use("/audio", express.static(path.join(__dirname, "../public/audio")));
app.use("/api", routes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err.name === "ZodError") {
    return res.status(400).json({ message: "Dados inválidos" });
  }
  const message = err.message || "Erro interno do servidor";
  const status = message.includes("não encontrada") ? 404 : 400;
  return res.status(status).json({ message });
});

export default app;
