import {ShortenUrlService} from "../ShortenUrlService";
import {type KeyGenerator} from "../../domain/KeyGenerator";
import {type UrlRepository} from "../../domain/UrlRepository";
import {ShortenedUrl} from "../../domain/ShortenedUrl";
import {UnableToShortenUrlError} from "./UnableToShortenUrlError";

describe("ShortenUrlService", () => {
  it("should generate a key from the received url", async () => {
    const url = "https://www.google.com";
    const keyGenerator: KeyGenerator = {
      generateKeyFromHashOf: jest.fn()
    }
    const urlRepository: UrlRepository = {
      findUrlByOriginalUrl: jest.fn(),
      save: jest.fn(),
    }

    const shortenUrlService = new ShortenUrlService(keyGenerator, urlRepository);

    await shortenUrlService.shortenUrl(url);

    expect(keyGenerator.generateKeyFromHashOf).toHaveBeenCalledWith(url);
  })

  it("should save the shortened url in the repository", async () => {
    const url = "https://www.google.com";
    const key = "abc123";
    const keyGenerator: KeyGenerator = {
      generateKeyFromHashOf: jest.fn().mockReturnValue(key)
    }
    const urlRepository: UrlRepository = {
      findUrlByOriginalUrl: jest.fn(),
      save: jest.fn(),
    }
    const expectedShortenedUrl = new ShortenedUrl({key, originalUrl: url});

    const shortenUrlService = new ShortenUrlService(keyGenerator, urlRepository);

    await shortenUrlService.shortenUrl(url);

    expect(urlRepository.save).toHaveBeenCalledWith(expectedShortenedUrl);
  })

  it("should throw UnableToShortenUrlError if unable to create the url", () => {
    const url = "https://www.google.com";
    const key = "abc123";
    const keyGenerator: KeyGenerator = {
      generateKeyFromHashOf: jest.fn().mockReturnValue(key)
    }
    const repositoryError = new Error();
    const urlRepository: UrlRepository = {
      findUrlByOriginalUrl: jest.fn(),
      save: jest.fn().mockRejectedValue(repositoryError),
    }

    const shortenUrlService = new ShortenUrlService(keyGenerator, urlRepository);

    void expect(async () => shortenUrlService.shortenUrl(url)).rejects.toThrow(UnableToShortenUrlError);
  })
})

