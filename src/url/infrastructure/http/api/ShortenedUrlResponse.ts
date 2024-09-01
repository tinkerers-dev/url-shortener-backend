import {type ShortenedUrl} from "../../../domain/ShortenedUrl";

export class ShortenedUrlResponse {
  constructor(private readonly shortenedUrl: ShortenedUrl, private readonly origin: string) {

  }

  toObject() {
    return {
      key: this.shortenedUrl.getKey(),
      originalUrl: this.shortenedUrl.getOriginalUrl(),
      shortUrl: `${this.origin}/${this.shortenedUrl.getKey()}`
    };
  }
}
