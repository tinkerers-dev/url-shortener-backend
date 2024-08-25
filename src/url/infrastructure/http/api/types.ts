import { type Request } from "express";

export type RequestWithOriginalUrl = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  { url: string }
>;
