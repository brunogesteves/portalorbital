import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import routes from "./routes";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://admin.localhost",
      "http://orbitaladmin",
      "https://orbitalportalpoliticoadmin.vercel.app",
      "https://orbitalportalpolitico.vercel.app",
      "http://api",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use("/audio", express.static(path.join(__dirname, "../public/audio")));
app.use("/api", routes);

export default app;
