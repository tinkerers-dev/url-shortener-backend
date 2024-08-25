import {type NextFunction, type Response} from "express";
import {type RequestWithOriginalUrl} from "./types";
import ServerError from "../../../../server/middlewares/errors/ServerError/ServerError";
import {type UrlShortener} from "../../../domain/UrlShortener";

export class UrlController {
  constructor(private readonly shortenUrlService: UrlShortener) {
  }

  createShortenedUrl = async (
    req: RequestWithOriginalUrl,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const originalUrl = req.body.url;
    const shortenedUrl = await this.shortenUrlService.shortenUrl(originalUrl);

    // if (url) {
    //   res.status(409).json({data: url});
    //   return;
    // }
    //
    // try {
    //   const shortenedUrl = await this.repository.save(req.body.url);
    //
    //   res.status(200).json({data: shortenedUrl});
    // } catch (error) {
    //   next(new ServerError((error as Error).message, 500));
    // }
  };

 
}
