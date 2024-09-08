import { type Response, type NextFunction } from "express";
import { UserController } from "../UserController.js";
import {
  type UserCredentials,
  type UserService,
} from "../../../../UserService";
import { type SignUpRequest } from "../SignUpRequest.js";

describe("UserController", () => {
  it("should invoke CreateUser with userCredentials", () => {
    const email = "example@email.com";
    const password = "*1234Abc";

    const userCredentials: UserCredentials = {
      password,
      email,
    };

    const req: Partial<SignUpRequest> = { body: { email, password } };
    const res: Partial<Response> = {};
    const next = jest.fn();

    const userService: UserService = {
      createUser: jest.fn(),
    };

    const userController = new UserController(userService);

    userController.signUp(
      req as SignUpRequest,
      res as Response,
      next as NextFunction,
    );

    expect(userService.createUser).toHaveBeenCalledWith(userCredentials);
  });
});
