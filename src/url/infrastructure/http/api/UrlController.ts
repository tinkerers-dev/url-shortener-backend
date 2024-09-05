import {type NextFunction, type Request, type Response} from "express";
import {type RequestWithOriginalUrl} from "./types";
import {type UrlShortener} from "../../../domain/UrlShortener";
import {type Configuration} from "../../../../config/Configuration";
import {ShortenedUrlResponse} from "./ShortenedUrlResponse.js";
import ServerError from "../../../../shared/infrastructure/http/server/middlewares/errors/ServerError/ServerError.js";
import {HttpStatus} from "../../../../shared/infrastructure/http/HttpStatus";

export class UrlController {
  constructor(private readonly shortenUrlService: UrlShortener, private readonly configuration: Configuration) {
  }

  async createShortenedUrl(
    req: RequestWithOriginalUrl,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
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


  async redirectToOriginalUrl(req: Request, res: Response, next: NextFunction): Promise<void> {
    const shortenedUrl = await this.shortenUrlService.findUrlByKey(req.params.key);
    
    if (shortenedUrl.getOriginalUrl() === null) {
        return next();
    }
    
    res.redirect(shortenedUrl.getOriginalUrl())
  }
}
