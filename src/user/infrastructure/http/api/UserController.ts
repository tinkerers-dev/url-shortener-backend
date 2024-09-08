import type { NextFunction, Response } from "express";
import { type UserCredentials, type UserService } from "../../../UserService";
import { type SignUpRequest } from "./SignUpRequest";

export class UserController {
  constructor(private readonly userService: UserService) {}

  signUp(req: SignUpRequest, res: Response, next: NextFunction) {
    const userCredentials: UserCredentials = {
      email: req.body.email,
      password: req.body.password,
    };
    this.userService.createUser(userCredentials);
  }
}
