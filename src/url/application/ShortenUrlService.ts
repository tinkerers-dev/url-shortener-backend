import {type UrlRepository} from "../domain/UrlRepository";
import {type KeyGenerator} from "../domain/KeyGenerator";
import {ShortenedUrl} from "../domain/ShortenedUrl.js";
import {UnableToShortenUrlError} from "../domain/errors/UnableToShortenUrlError.js";
import {type UrlShortener} from "../domain/UrlShortener.js";

export class ShortenUrlService implements UrlShortener {
  constructor(private readonly keyGenerator: KeyGenerator, private readonly urlRepository: UrlRepository) {
  }

  async shortenUrl(originalUrl: string): Promise<ShortenedUrl> {
    const key = this.keyGenerator.generateKeyFromHashOf(originalUrl);

    try {
      const existingUrl = await this.urlRepository.findUrlByKey(key);

      if (existingUrl.getOriginalUrl() !== null) {
        return existingUrl;
      }

      const url = new ShortenedUrl({
        key,
        originalUrl
      });
      await this.urlRepository.save(url);
      return url;
    } catch (error) {
      throw new UnableToShortenUrlError(error as Error);
    }
  }

  async findUrlByKey(key: string): Promise<ShortenedUrl> {
    return this.urlRepository.findUrlByKey(key);
  }
}
