import express from "express";
import authRoutes from "./controllers/auth.routes";
import categoryRoutes from "./controllers/category.routes";
import postRoutes from "./controllers/post.routes";
import searchRoutes from "./controllers/search.routes";

const routes = express();

routes.use("/api/auth", authRoutes);
routes.use("/api/categories", categoryRoutes);
routes.use("/api/posts", postRoutes);
routes.use("/api/search", searchRoutes);

export default routes;
