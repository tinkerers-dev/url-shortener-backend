import "dotenv/config";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../app/app";
import { type ShortenedUrlStructure } from "../../../../../url/types";
import connectToDataBase from "../../../database";
import { ShortenedUrlModel } from "../../../../../url/infrastructure/persistence/model/ShortenedUrlModel";
import { ShortenedUrl } from "../../../../../url/domain/ShortenedUrl";
import {HttpStatus} from "../../../../../url/infrastructure/http/api/UrlController";

let mongoMemoryServer: MongoMemoryServer;
let serverUri: string;

beforeAll(async () => {
  mongoMemoryServer = await MongoMemoryServer.create();
  serverUri = mongoMemoryServer.getUri();

  await connectToDataBase(serverUri);
});

afterEach(async () => {
  await ShortenedUrlModel.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoMemoryServer.stop();
});

describe("Given a post /shorten-url endpoint", () => {
  describe("When it receives a Request, with www.example.com/example", () => {
    const route = "/shorten-url";

    const url = "www.example.com/example";

    test("Then it should respond with a status 201 and the shortenedUrl", async () => {
      const response = await request(app).post(route).send({ url }).expect(HttpStatus.CREATED);

      const body = response.body as ShortenedUrlStructure;

      expect(body).toHaveProperty("originalUrl", url);
      expect(body).toHaveProperty("key");
      expect(body).toHaveProperty("shortUrl");
    });
  });
});
