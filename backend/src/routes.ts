import express from "express";
import authControllers from "./controllers/auth/auth.controller";
import categoryControllers from "./controllers/category/category.controller";
import postControllers from "./controllers/post/post.controller";
import searchControllers from "./controllers/search/search.controller";
import imagesControllers from "./controllers/images.controllers";
import audioControllers from "./controllers/audio.controller";

const routes = express();

routes.use("/auth", authControllers);
routes.use("/categories", categoryControllers);
routes.use("/posts", postControllers);
routes.use("/search", searchControllers);
routes.use("/images", imagesControllers);
routes.use("/audio", audioControllers);

export default routes;
