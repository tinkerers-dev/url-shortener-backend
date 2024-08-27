import {type NextFunction, type Response} from "express";
import {type RequestWithOriginalUrl} from "./types";
import {type UrlShortener} from "../../../domain/UrlShortener";
import {type Configuration} from "../../../../config/Configuration";
import {ShortenedUrlResponse} from "./ShortenedUrlResponse.js";
import ServerError from "../../../../shared/infrastructure/http/server/middlewares/errors/ServerError/ServerError.js";

export enum HttpStatus {
  CREATED = 201,
}

export class UrlController {
  constructor(private readonly shortenUrlService: UrlShortener, private readonly configuration: Configuration) {
  }

  createShortenedUrl = async (
    req: RequestWithOriginalUrl,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const originalUrl = req.body.url;

    try {

      const shortenedUrl = await this.shortenUrlService.shortenUrl(originalUrl);

      const origin = this.configuration.deployUrl;
      const shortenedUrlResponse = new ShortenedUrlResponse(shortenedUrl, origin);

      res.status(HttpStatus.CREATED).json(shortenedUrlResponse.toObject());
    } catch (error) {
      next(new ServerError((error as Error).message, 500));
    }
  };


}
