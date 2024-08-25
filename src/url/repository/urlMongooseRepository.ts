import "dotenv/config";
import { type Model } from "mongoose";
import { type ShortenedUrlStructure } from "../types";
import { createKey } from "../utils/createKey.js";

export class UrlMongooseRepository {
  constructor(public readonly model: Model<ShortenedUrlStructure>) {}

  async shortenUrl(originalUrl: string): Promise<ShortenedUrlStructure> {
    const shortenedUrl = new ShortenUrl(originalUrl);

    return this.model.create(shortenedUrl);
  }
}

export class ShortenUrl {
  public key: string;
  public shortUrl: string;

  constructor(public originalUrl: string) {
    this.key = createKey(originalUrl);
    this.shortUrl = `${process.env.URL}/${this.key}`;
  }
}
