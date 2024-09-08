import express from "express";
import cors from "cors";
import morgan from "morgan";
import { generalError } from "../middlewares/generalError.js";
import { UrlController } from "../../../../../url/infrastructure/http/api/UrlController.js";
import { ShortenedUrlModel } from "../../../../../url/infrastructure/persistence/model/ShortenedUrlModel.js";
import { MongooseUrlRepository } from "../../../../../url/infrastructure/persistence/repository/MongooseUrlRepository.js";
import { ShortenUrlService } from "../../../../../url/application/ShortenUrlService.js";
import { Crc32KeyGenerator } from "../../../../../url/infrastructure/crypto/Crc32KeyGenerator.js";
import { configuration } from "../../../../../config/index.js";
import { notFoundError } from "../middlewares/notFoundError.js";
import { UserController } from "../../../../../user/infrastructure/http/api/UserController.js";
import { UserService } from "../../../../../user/UserService.js";

const app = express();
app.disable("x-powered-by");

const repository = new MongooseUrlRepository(ShortenedUrlModel);
const keyGenerator = new Crc32KeyGenerator();
const userService = new UserService();
const shortenUrlService = new ShortenUrlService(keyGenerator, repository);
const urlController = new UrlController(shortenUrlService, configuration);
const userController = new UserController(userService);

app.use(morgan("dev"));
app.use(express.json());

app.use(cors());

app.get("/:key", urlController.redirectToOriginalUrl.bind(urlController));
app.post("/shorten-url", urlController.createShortenedUrl.bind(urlController));
app.post("/sign-up", userController.signUp.bind(userController));
app.use(notFoundError);
app.use(generalError);

export default app;
