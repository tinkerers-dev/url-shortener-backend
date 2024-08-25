import {type Url} from "../domain/Url";
import {type UrlRepository} from "../domain/UrlRepository";
import {type KeyGenerator} from "../domain/KeyGenerator";
import {NullUrl} from "../domain/NullUrl";

export class ShortenUrlService {
  constructor(private readonly keyGenerator: KeyGenerator, private readonly urlRepository: UrlRepository) {
  }

  async shortenUrl(originalUrl: string, host: string): Promise<Url> {
    this.keyGenerator.generateKeyFromHashOf(originalUrl);
    
    return new NullUrl();
  }
}
