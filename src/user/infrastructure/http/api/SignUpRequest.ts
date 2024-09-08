import { type Request } from "express";

export type SignUpRequest = Request<
  Record<string, any>,
  Record<string, any>,
  {
    email: string;
    password: string;
  }
>;
