import express from "express";
import authControllers from "./controllers/auth/auth.controllers";
import categoryControllers from "./controllers/category/category.controllers";
import postControllers from "./controllers/post/post.controllers";
import searchControllers from "./controllers/search/search.controllers";
import imagesControllers from "./controllers/images.controllers";
import audioControllers from "./controllers/audio.controllers";

const routes = express();

routes.use("/api/auth", authControllers);
routes.use("/api/categories", categoryControllers);
routes.use("/api/posts", postControllers);
routes.use("/api/search", searchControllers);
routes.use("/api/images", imagesControllers);
routes.use("/api/audio", audioControllers);

export default routes;
