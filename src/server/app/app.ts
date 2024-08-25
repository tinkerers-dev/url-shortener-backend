import express from "express";
import cors from "cors";
import morgan from "morgan";
import notFoundError from "../middlewares/notFoundError.js";
import { generalError } from "../middlewares/generalError.js";
import { UrlController } from "../../url/infrastructure/http/api/UrlController";
import { ShortenedUrlModel } from "../../url/infrastructure/persistence/model/ShortenedUrlModel";
import { MongooseUrlRepository } from "../../url/infrastructure/persistence/repository/MongooseUrlRepository";
import {Configuration} from "../../config/Configuration";
import {ShortenUrlService} from "../../url/application/ShortenUrlService";
import {Crc32KeyGenerator} from "../../url/infrastructure/crypto/Crc32KeyGenerator";

const app = express();
app.disable("x-powered-by");

const configuration = new Configuration();
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
