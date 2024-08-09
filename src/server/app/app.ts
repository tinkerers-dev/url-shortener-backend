import express from "express";
import cors from "cors";
import morgan from "morgan";
import notFoundError from "../middlewares/notFoundError.js";
import { generalError } from "../middlewares/generalError.js";
import { UrlController } from "../../url/controller/UrlController.js";
import { ShortenedUrl } from "../../url/model/ShortenedUrl.js";
import { UrlMongooseRepository } from "../../url/repository/urlMongooseRepository.js";

const app = express();
app.disable("x-powered-by");

const repository = new UrlMongooseRepository(ShortenedUrl);
const controller = new UrlController(repository);

app.use(morgan("dev"));
app.use(express.json());

app.use(cors());

app.post("/shorten-url", controller.createShortenedUrl);
app.use(notFoundError);
app.use(generalError);

export default app;
