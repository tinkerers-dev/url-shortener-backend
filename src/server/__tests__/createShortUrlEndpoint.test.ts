import "dotenv/config";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../app/app";
import { type ShortenedUrlStructure } from "../../url/types";
import connectToDataBase from "../../database";
import { ShortenedUrl } from "../../url/model/ShortenedUrl";
import { ShortenUrl } from "../../url/ShortenUrl";

let mongoMemoryServer: MongoMemoryServer;
let serverUri: string;

beforeAll(async () => {
  mongoMemoryServer = await MongoMemoryServer.create();
  serverUri = mongoMemoryServer.getUri();

  await connectToDataBase(serverUri);
});

afterEach(async () => {
  await ShortenedUrl.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoMemoryServer.stop();
});

describe("Given a post /shorten-url endpoint", () => {
  describe("When it receives a Request, with www.example.com/example", () => {
    const route = "/shorten-url";

    const url = "www.example.com/example";
    const shortenedUrl = new ShortenUrl(url);

    test("Then it should respond with a status 200 and the data: originalUrl: www.example.com/example ", async () => {
      const response = await request(app).post(route).send({ url }).expect(200);

      const body = response.body as { data: ShortenedUrlStructure };

      expect(body.data).toEqual(expect.objectContaining(shortenedUrl));
    });

    test("And it already exists Then it should respond with a status 409 and the data: originalUrl: www.example.com/example ", async () => {
      await ShortenedUrl.create(shortenedUrl);

      const response = await request(app).post(route).send({ url }).expect(409);

      const body = response.body as { data: ShortenedUrlStructure };

      expect(body.data).toEqual(expect.objectContaining(shortenedUrl));
    });
  });
});
