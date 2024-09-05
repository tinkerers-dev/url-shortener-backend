import request from "supertest";
import app from "../app/app";
import {MongoMemoryServer} from "mongodb-memory-server";
import connectToDataBase from "../../../database";
import mongoose from "mongoose";

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


describe("Given a non existing endpoint", () => {
  describe("When it receives a Request,", () => {
    test("Then it should respond with a status 404 and the error:'Endpoint not found' ", async () => {
      const response = await request(app).get("/unknown-endpoint").expect(404);

      const body = response.body as { error: string };

      expect(body.error).toBe("Endpoint not found");
    });
  });
});
