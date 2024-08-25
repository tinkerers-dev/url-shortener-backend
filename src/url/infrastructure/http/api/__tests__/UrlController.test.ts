import {UrlController} from "../UrlController";
import {type RequestWithOriginalUrl} from "../types";
import {type Response} from "express";
import {type UrlShortener} from "../../../../domain/UrlShortener";

describe("UrlController", () => {
  it("should create a shortened url", async () => {
    const shortenUrlService: UrlShortener = {
      shortenUrl: jest.fn()
    }
    const url = "https://www.google.com";
    const req: Partial<RequestWithOriginalUrl> = {
      body: {
        url
      }
    }
    const urlController = new UrlController(shortenUrlService);

    await urlController.createShortenedUrl(req as RequestWithOriginalUrl, null as unknown as Response, jest.fn());

    expect(shortenUrlService.shortenUrl).toHaveBeenCalledWith(url);
  })
})
