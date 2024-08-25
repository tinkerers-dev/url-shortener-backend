import {type Url} from "../domain/Url";
import {type UrlRepository} from "../domain/UrlRepository";
import {type KeyGenerator} from "../domain/KeyGenerator";
import {ShortenedUrl} from "../domain/ShortenedUrl";
import {UnableToShortenUrlError} from "./__tests__/UnableToShortenUrlError";

export class ShortenUrlService {
  constructor(private readonly keyGenerator: KeyGenerator, private readonly urlRepository: UrlRepository) {
  }

  async shortenUrl(originalUrl: string): Promise<Url> {
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
