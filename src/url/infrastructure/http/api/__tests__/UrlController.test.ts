import {HttpStatus, UrlController} from "../UrlController";
import {type RequestWithOriginalUrl} from "../types";
import {type Response} from "express";
import {type UrlShortener} from "../../../../domain/UrlShortener";
import {ShortenedUrl} from "../../../../domain/ShortenedUrl";
import {type Configuration} from "../../../../../config/Configuration";
import {ShortenedUrlResponse} from "../ShortenedUrlResponse";

describe("UrlController", () => {
  const originalUrl = "https://www.google.com";
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  }

  it("should create a shortened url and respond with the shortened url and status 200", async () => {
    const key = "abc123";
    const shortenedUrl = new ShortenedUrl({key, originalUrl});
    const shortenUrlService: UrlShortener = {
      shortenUrl: jest.fn().mockResolvedValue(shortenedUrl)
    }
    const configuration: Configuration = {
      deployUrl: "http://localhost:3000"
    }
    const req: Partial<RequestWithOriginalUrl> = {
      body: {
        url: originalUrl
      }
    }
    const expectedShortenedUrlJson = new ShortenedUrlResponse(shortenedUrl, configuration.deployUrl).toJSON();
    const urlController = new UrlController(shortenUrlService, configuration);

    await urlController.createShortenedUrl(req as RequestWithOriginalUrl, res as Response, jest.fn());

    expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(res.json).toHaveBeenCalledWith(expectedShortenedUrlJson);
  })
})
