import { type Response, type NextFunction } from "express";
import { UserController } from "../UserController.js";
import { type UserService } from "../../../../UserService";
import { type SignUpRequest } from "../SignUpRequest.js";
import { HttpStatus } from "../../../../../shared/infrastructure/http/HttpStatus.js";

describe("UserController", () => {
  it("should emit a response with 201 when the user is created successfully", async () => {
    const email = "example@email.com";
    const password = "*1234Abc";

    const req: Partial<SignUpRequest> = { body: { email, password } };
    const res: Partial<Response> = {
      status: jest.fn(),
    };
    const next = jest.fn();

    const userService: UserService = {
      createUser: jest.fn().mockResolvedValue(undefined),
    };

    const userController = new UserController(userService);

    await userController.signUp(
      req as SignUpRequest,
      res as Response,
      next as NextFunction,
    );

    expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
  });
});
