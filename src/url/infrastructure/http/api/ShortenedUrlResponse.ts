import {ShortenedUrl} from "../../../domain/ShortenedUrl";

export class ShortenedUrlResponse {
  constructor(private readonly shortenedUrl: ShortenedUrl, private readonly origin: string) {

  }

  toJSON() {
    return JSON.stringify({
      key: this.shortenedUrl.getKey(),
      originalUrl: this.shortenedUrl.getOriginalUrl(),
      shortUrl: `${this.origin}/${this.shortenedUrl.getKey()}`
    });
  }
}
