import request from "supertest";
import app from "../../shared/infrastructure/http/server/app/app";
import {MongoMemoryServer} from "mongodb-memory-server";
import connectToDataBase from "../../shared/infrastructure/database";
import mongoose from "mongoose";
import {ShortenedUrl} from "../../url/domain/ShortenedUrl";
import {ShortenedUrlModel} from "../../url/infrastructure/persistence/model/ShortenedUrlModel";
import {ShortenedUrlResponse} from "../../url/infrastructure/http/api/ShortenedUrlResponse";
import {HttpStatus} from "../../shared/infrastructure/http/HttpStatus";

let mongoMemoryServer: MongoMemoryServer;
let serverUri: string;

beforeAll(async () => {
  mongoMemoryServer = await MongoMemoryServer.create();
  serverUri = mongoMemoryServer.getUri();

  await connectToDataBase(serverUri);
});

afterAll(async () => {
  await mongoose.disconnect()
  await mongoMemoryServer.stop();
});


describe("Given a guest user has created a shortened URL", () => {
  const shortenedUrl: ShortenedUrl = new ShortenedUrl({key: "abc123", originalUrl: "https://www.google.com"});

  beforeEach(async () => {
    await ShortenedUrlModel.create(shortenedUrl)
  })

  describe("When the user visits the shortened URL", () => {
    it("Then the user should be redirected to the original URL", async () => {
      await request(app).get(`/${shortenedUrl.getKey()}`).expect(HttpStatus.TEMPORARY_REDIRECT).expect("Location", shortenedUrl.getOriginalUrl());
    })
  })
})
