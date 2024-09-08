import { type Response, type Request, type NextFunction } from "express";

export class UserController {
  constructor(private readonly userService: UserService) {}

  signUp(req: Request, res: Response, next: NextFunction) {
    this.userService.createUser();
  }
}

export interface UserService {
  createUser(): unknown;
}

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
