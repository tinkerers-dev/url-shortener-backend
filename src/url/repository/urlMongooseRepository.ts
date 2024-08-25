import "dotenv/config";
import { type Model } from "mongoose";
import { type ShortenedUrlStructure } from "../types";
import { ShortenUrl } from "../ShortenUrl";

export class UrlMongooseRepository {
  constructor(public readonly model: Model<ShortenedUrlStructure>) {}

  async shortenUrl(originalUrl: string): Promise<ShortenedUrlStructure> {
    const shortenedUrl = new ShortenUrl(originalUrl);

    return this.model.create(shortenedUrl);
  }
}
