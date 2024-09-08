import type { NextFunction, Request, Response } from "express";
import { type UserService } from "../../../UserService";

export class UserController {
  constructor(private readonly userService: UserService) {}

  signUp(req: Request, res: Response, next: NextFunction) {
    this.userService.createUser();
  }
}
