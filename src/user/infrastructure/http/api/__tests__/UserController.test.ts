import { type Response, type Request, type NextFunction } from "express";
import { UserController } from "../UserController.js";
import { type UserService } from "../../../../UserService";

describe("UserController", () => {
  it("should call its service", () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {};
    const next = jest.fn();

    const userService: UserService = {
      createUser: jest.fn(),
    };

    const userController = new UserController(userService);

    userController.signUp(
      req as Request,
      res as Response,
      next as NextFunction,
    );

    expect(userService.createUser).toHaveBeenCalled();
  });
});
