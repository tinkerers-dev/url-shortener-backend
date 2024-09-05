import {UrlController} from "../UrlController";
import {type RequestWithOriginalUrl} from "../types";
import {type Request, type Response} from "express";
import {type UrlShortener} from "../../../../domain/UrlShortener";
import {ShortenedUrl} from "../../../../domain/ShortenedUrl";
import {type Configuration} from "../../../../../config/Configuration";
import {ShortenedUrlResponse} from "../ShortenedUrlResponse";
import ServerError from "../../../../../shared/infrastructure/http/server/middlewares/errors/ServerError/ServerError";
import {HttpStatus} from "../../../../../shared/infrastructure/http/HttpStatus";
import {NullShortenedUrl} from "../../../../domain/NullShortenedUrl";

describe("UrlController", () => {
  const originalUrl = "https://www.google.com";
  const req: Partial<RequestWithOriginalUrl> = {
    body: {
      url: originalUrl
    }
  }
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    redirect: jest.fn(),
  }
  const configuration: Configuration = {
    deployUrl: "http://localhost:3000",
    port: 3000,
    mongoDbUri: "",
  }

  afterEach(() => {
    jest.clearAllMocks();
  })

  it("should create a shortened url and respond with the shortened url and status 200", async () => {
    const key = "abc123";
    const shortenedUrl = new ShortenedUrl({key, originalUrl});
    const shortenUrlService: UrlShortener = {
      shortenUrl: jest.fn().mockResolvedValue(shortenedUrl),
      findUrlByKey: jest.fn(),
    }
    const expectedShortenedUrlJson = new ShortenedUrlResponse(shortenedUrl, configuration.deployUrl).toObject();
    const urlController = new UrlController(shortenUrlService, configuration);

    await urlController.createShortenedUrl(req as RequestWithOriginalUrl, res as Response, jest.fn());

    expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(res.json).toHaveBeenCalledWith(expectedShortenedUrlJson);
  })

  it("should invoke next function with error if unable to create the shortened url", async () => {
    const shortenUrlService: UrlShortener = {
      shortenUrl: jest.fn().mockRejectedValue(new Error()),
      findUrlByKey: jest.fn(),
    }
    const next = jest.fn();
    const urlController = new UrlController(shortenUrlService, configuration);

    await urlController.createShortenedUrl(req as RequestWithOriginalUrl, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(ServerError));
  });

  it("should redirect to the original url found with the key", async () => {
    const key = "abc123";
    const shortenUrlService: UrlShortener = {
      shortenUrl: jest.fn(),
      findUrlByKey: jest.fn().mockResolvedValue(new ShortenedUrl({key, originalUrl})),
    }
    const next = jest.fn();
    const req: Partial<Request> = {
      params: {
        key
      }
    }
    const urlController = new UrlController(shortenUrlService, configuration);

    await urlController.redirectToOriginalUrl(req as Request, res as Response, next);

    expect(res.redirect).toHaveBeenCalledWith(originalUrl);
  })
  
  it("should invoke next if the shortened url is not found", async () => {
    const key = "abc123";
    const shortenUrlService: UrlShortener = {
      shortenUrl: jest.fn(),
      findUrlByKey: jest.fn().mockResolvedValue(new NullShortenedUrl()),
    }
    const next = jest.fn();
    const req: Partial<Request> = {
      params: {
        key
      }
    }
    const urlController = new UrlController(shortenUrlService, configuration);

    await urlController.redirectToOriginalUrl(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  })
})
