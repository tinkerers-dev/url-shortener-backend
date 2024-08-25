import {ShortenUrlService} from "../ShortenUrlService";
import {type KeyGenerator} from "../../domain/KeyGenerator";
import {type UrlRepository} from "../../domain/UrlRepository";

describe("ShortenUrlService", () => {
  it("should generate a key from the received url", async () => {
    const url = "https://www.google.com";
    const keyGenerator: KeyGenerator = {
      generateKeyFromHashOf: jest.fn()
    }
    const urlRepository: UrlRepository = {
      findUrlByOriginalUrl: jest.fn(),
      shortenUrl: jest.fn(),
    }

    const shortenUrlService = new ShortenUrlService(keyGenerator, urlRepository);

    await shortenUrlService.shortenUrl(url, "localhost");
    
    expect(keyGenerator.generateKeyFromHashOf).toHaveBeenCalledWith(url);
  })
})
