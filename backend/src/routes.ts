import express from "express";
import authRoutes from "./controllers/auth.routes";
import categoryRoutes from "./controllers/category.routes";
import postRoutes from "./controllers/post.routes";
import searchRoutes from "./controllers/search.routes";
import imagesRoutes from "./controllers/images.routes";
import audioRoutes from "./controllers/audio.routes";

const routes = express();

routes.use("/api/auth", authRoutes);
routes.use("/api/categories", categoryRoutes);
routes.use("/api/posts", postRoutes);
routes.use("/api/search", searchRoutes);
routes.use("/api/images", imagesRoutes);
routes.use("/api/audio", audioRoutes);

export default routes;
