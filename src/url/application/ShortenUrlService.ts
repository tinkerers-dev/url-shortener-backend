import {type UrlRepository} from "../domain/UrlRepository";
import {type KeyGenerator} from "../domain/KeyGenerator";
import {ShortenedUrl} from "../domain/ShortenedUrl";
import {UnableToShortenUrlError} from "./__tests__/UnableToShortenUrlError";
import {UrlShortener} from "../domain/UrlShortener";

export class ShortenUrlService implements UrlShortener {
  constructor(private readonly keyGenerator: KeyGenerator, private readonly urlRepository: UrlRepository) {
  }

  async shortenUrl(originalUrl: string): Promise<ShortenedUrl> {
    const key = this.keyGenerator.generateKeyFromHashOf(originalUrl);

    const url = new ShortenedUrl({
      key,
      originalUrl
    });

    try {
      await this.urlRepository.save(url);
      return url;
    } catch (error) {
      throw new UnableToShortenUrlError(error as Error);
    }
  }
}
