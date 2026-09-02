import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import routes from "./routes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://admin.localhost"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use("/audio", express.static(path.join(__dirname, "../public/audio")));
app.use("/", routes);

export default app;
