import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import postRoutes from "./routes/post.routes";
import searchRoutes from "./routes/search.routes";

const app = express();




app.use(
  cors({

    origin: ["http://localhost", "http://admin.localhost"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use(
  "/images",
  express.static(path.join(__dirname, "../public/images"))
);

app.use(
  "/audio",
  express.static(path.join(__dirname, "../public/audio"))
);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/search", searchRoutes);

export default app;
