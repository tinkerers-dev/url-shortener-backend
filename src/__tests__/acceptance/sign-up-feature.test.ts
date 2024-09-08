import request from "supertest";
import app from "../../shared/infrastructure/http/server/app/app";
import { HttpStatus } from "../../shared/infrastructure/http/HttpStatus";

describe("Given a new user", () => {
  describe("When they submit their credentials", () => {
    test("Then an account should be created for the user", async () => {
      const response = await request(app).post("/sign-up").send({
        email: "example@email.com",
        password: "*1234Abc",
      });

      expect(response.status).toBe(HttpStatus.CREATED);
    });
  });
});
