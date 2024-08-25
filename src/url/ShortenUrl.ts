import { createKey } from "./utils/createKey";

export class ShortenUrl {
  public key: string;
  public shortUrl: string;

  constructor(public originalUrl: string) {
    this.key = createKey(originalUrl);
    this.shortUrl = `${process.env.URL}/${this.key}`;
  }
}
