import express from "express";
import authControllers from "./controllers/auth/auth.controller";
import categoryControllers from "./controllers/category/category.controller";
import postControllers from "./controllers/post/post.controller";
import searchControllers from "./controllers/search/search.controller";
import imagesControllers from "./controllers/images.controllers";
import audioControllers from "./controllers/audio.controller";

const routes = express();

routes.use("/api/auth", authControllers);
routes.use("/api/categories", categoryControllers);
routes.use("/api/posts", postControllers);
routes.use("/api/search", searchControllers);
routes.use("/api/images", imagesControllers);
routes.use("/api/audio", audioControllers);

export default routes;
