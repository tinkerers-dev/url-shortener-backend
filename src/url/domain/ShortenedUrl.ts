type ShortenedUrlProps = {
  key: string,
  originalUrl: string,
};

export class ShortenedUrl {
  private readonly key: string;
  private readonly originalUrl: string;
  constructor({originalUrl, key}: ShortenedUrlProps) {
    this.originalUrl = originalUrl
    this.key = key;
  }

  getKey() {
    return this.key
  }

  getOriginalUrl() {
    return this.originalUrl;
  }
}
