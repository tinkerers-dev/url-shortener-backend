import {ShortenUrlService} from "../ShortenUrlService";
import {type KeyGenerator} from "../../domain/KeyGenerator";
import {type UrlRepository} from "../../domain/UrlRepository";
import {ShortenedUrl} from "../../domain/ShortenedUrl";
import {UnableToShortenUrlError} from "../../domain/errors/UnableToShortenUrlError";
import {NullShortenedUrl} from "../../domain/NullShortenedUrl";
import {afterEach} from "@jest/globals";

describe("ShortenUrlService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  })
  
  it("should check if the shortened url already exists", async () => {
    const url = "https://www.google.com";
    const key = "abc123";
    const keyGenerator: KeyGenerator = {
      generateKeyFromHashOf: jest.fn().mockReturnValue(key)
    }
    const expectedShortenedUrl = new ShortenedUrl({key, originalUrl: url});
    const urlRepository: UrlRepository = {
      findUrlByKey: jest.fn().mockReturnValue(expectedShortenedUrl),
      save: jest.fn(),
    }

    const shortenUrlService = new ShortenUrlService(keyGenerator, urlRepository);

    const shortenedUrl = await shortenUrlService.shortenUrl(url);

    expect(shortenedUrl).toEqual(expectedShortenedUrl);

  });

  it("should save the shortened url in the repository", async () => {
    const url = "https://www.google.com";
    const key = "abc123";
    const keyGenerator: KeyGenerator = {
      generateKeyFromHashOf: jest.fn().mockReturnValue(key)
    }
    const urlRepository: UrlRepository = {
      findUrlByKey: jest.fn().mockReturnValue(new NullShortenedUrl()),
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
      findUrlByKey: jest.fn(),
      save: jest.fn().mockRejectedValue(repositoryError),
    }

    const shortenUrlService = new ShortenUrlService(keyGenerator, urlRepository);

    void expect(async () => shortenUrlService.shortenUrl(url)).rejects.toThrow(UnableToShortenUrlError);
  })
  
  it("should find the url by the received key", async () => {
    const key = "abc123";
    const keyGenerator: KeyGenerator = {
      generateKeyFromHashOf: jest.fn(),
    }
    const urlRepository: UrlRepository = {
      findUrlByKey: jest.fn(),
      save: jest.fn(),
    }
    
    const shortenUrlService = new ShortenUrlService(keyGenerator, urlRepository);
    
    await shortenUrlService.findUrlByKey(key);
    
    expect(urlRepository.findUrlByKey).toHaveBeenCalledWith(key);
  })
})

