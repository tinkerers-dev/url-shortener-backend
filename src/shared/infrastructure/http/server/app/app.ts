import express from "express";
import cors from "cors";
import morgan from "morgan";
import {generalError} from "../middlewares/generalError.js";
import {UrlController} from "../../../../../url/infrastructure/http/api/UrlController.js";
import {ShortenedUrlModel} from "../../../../../url/infrastructure/persistence/model/ShortenedUrlModel.js";
import {MongooseUrlRepository} from "../../../../../url/infrastructure/persistence/repository/MongooseUrlRepository.js";
import {ShortenUrlService} from "../../../../../url/application/ShortenUrlService.js";
import {Crc32KeyGenerator} from "../../../../../url/infrastructure/crypto/Crc32KeyGenerator.js";
import {configuration} from "../../../../../config/index.js";
import {notFoundError} from "../middlewares/notFoundError.js";

const app = express();
app.disable("x-powered-by");

const repository = new MongooseUrlRepository(ShortenedUrlModel);
const keyGenerator = new Crc32KeyGenerator();
const shortenUrlService = new ShortenUrlService(keyGenerator, repository);
const controller = new UrlController(shortenUrlService, configuration);

app.use(morgan("dev"));
app.use(express.json());

app.use(cors());

app.post("/shorten-url", controller.createShortenedUrl);
app.use(notFoundError);
app.use(generalError);

export default app;
