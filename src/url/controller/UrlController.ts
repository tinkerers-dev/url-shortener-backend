import { type NextFunction, type Response } from "express";
import { type UrlMongooseRepository } from "../repository/urlMongooseRepository.js";
import { type RequestWithOriginalUrl } from "./types";
import ServerError from "../../server/middlewares/errors/ServerError/ServerError.js";

export class UrlController {
  constructor(public repository: UrlMongooseRepository) {}

  createShortenedUrl = async (
    req: RequestWithOriginalUrl,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const url = await this.repository.model
      .findOne({
        originalUrl: req.body.url,
      })
      .exec();

    if (url) {
      res.status(409).json({ data: url });
      return;
    }

    try {
      const shortenedUrl = await this.repository.shortenUrl(req.body.url);

      res.status(200).json({ data: shortenedUrl });
    } catch (error) {
      next(new ServerError((error as Error).message, 409));
    }
  };
}
