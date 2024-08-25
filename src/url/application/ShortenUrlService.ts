import {type Url} from "../domain/Url";
import {type UrlRepository} from "../domain/UrlRepository";
import {type KeyGenerator} from "../domain/KeyGenerator";
import {ShortenedUrl} from "../domain/ShortenedUrl";
import {NullUrl} from "../domain/NullUrl";

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
      
    }
    
    return new NullUrl();
  }
}
