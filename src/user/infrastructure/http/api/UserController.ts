import type { NextFunction, Response } from "express";
import { type UserCredentials, type UserCreator } from "../../../UserCreator";
import { type SignUpRequest } from "./SignUpRequest";
import { HttpStatus } from "../../../../shared/infrastructure/http/HttpStatus";

export class UserController {
  constructor(private readonly userService: UserCreator) {}

  async signUp(req: SignUpRequest, res: Response, _next: NextFunction) {
    const userCredentials: UserCredentials = {
      email: req.body.email,
      password: req.body.password,
    };

    await this.userService.createUser(userCredentials);

    res.status(HttpStatus.CREATED);
  }
}
