import { type Model } from "mongoose";
import { type ShortenedUrlStructure } from "../types";
import CRC32 from "crc-32";
import { ShortenedUrl } from "../model/ShortenedUrl";

class UrlMongooseRepository {
  constructor(public readonly model: Model<ShortenedUrlStructure>) {}

  async shortenUrl(originalUrl: string): Promise<ShortenedUrlStructure> {
    const shortenedUrl = new ShortenUrl(originalUrl);

    return this.model.create(shortenedUrl);
  }
}

export const urlRepository = new UrlMongooseRepository(ShortenedUrl);

class ShortenUrl {
  public key: string;
  public shortUrl: string;

  constructor(public originalUrl: string) {
    this.key = generateKey(originalUrl);
    this.shortUrl = `${process.env.URL}/${this.key}`;
  }
}

const generateKey = (url: string): string => String(CRC32.str(url));
