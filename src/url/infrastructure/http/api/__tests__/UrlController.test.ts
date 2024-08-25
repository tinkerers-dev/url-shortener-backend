import {HttpStatus, UrlController} from "../UrlController";
import {type RequestWithOriginalUrl} from "../types";
import {type Response} from "express";
import {type UrlShortener} from "../../../../domain/UrlShortener";
import {ShortenedUrl} from "../../../../domain/ShortenedUrl";
import {type Configuration} from "../../../../../config/Configuration";
import {ShortenedUrlResponse} from "../ShortenedUrlResponse";
import ServerError from "../../../../../server/middlewares/errors/ServerError/ServerError";

describe("UrlController", () => {
  const originalUrl = "https://www.google.com";
  const req: Partial<RequestWithOriginalUrl> = {
    body: {
      url: originalUrl
    }
  }
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  }
  const configuration: Configuration = {
    deployUrl: "http://localhost:3000"
  }

  afterEach(() => {
    jest.clearAllMocks();
  })

  it("should create a shortened url and respond with the shortened url and status 200", async () => {
    const key = "abc123";
    const shortenedUrl = new ShortenedUrl({key, originalUrl});
    const shortenUrlService: UrlShortener = {
      shortenUrl: jest.fn().mockResolvedValue(shortenedUrl)
    }
    const expectedShortenedUrlJson = new ShortenedUrlResponse(shortenedUrl, configuration.deployUrl).toJSON();
    const urlController = new UrlController(shortenUrlService, configuration);
    
    await urlController.createShortenedUrl(req as RequestWithOriginalUrl, res as Response, jest.fn());

    expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(res.json).toHaveBeenCalledWith(expectedShortenedUrlJson);
  })

  it("should invoke next function with error if unable to create the shortened url", async () => {
    const shortenUrlService: UrlShortener = {
      shortenUrl: jest.fn().mockRejectedValue(new Error())
    }
    const next = jest.fn();
    const urlController = new UrlController(shortenUrlService, configuration);

    await urlController.createShortenedUrl(req as RequestWithOriginalUrl, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(ServerError));
  });
})
