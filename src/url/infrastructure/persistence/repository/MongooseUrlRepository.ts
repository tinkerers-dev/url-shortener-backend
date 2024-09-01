import "dotenv/config";
import {type Model} from "mongoose";
import {type ShortenedUrlStructure} from "../../../types";
import {ShortenedUrl} from "../../../domain/ShortenedUrl.js";
import {type UrlRepository} from "../../../domain/UrlRepository";
import {NullShortenedUrl} from "../../../domain/NullShortenedUrl.js";


export class MongooseUrlRepository implements UrlRepository {
  constructor(public readonly model: Model<ShortenedUrlStructure>) {
  }

  async save(shortenedUrl: ShortenedUrl): Promise<void> {
    await this.model.create(shortenedUrl);
  }

  async findUrlByKey(originalUrl: string): Promise<ShortenedUrl> {
    const urlData = await this.model
      .findOne({
        originalUrl,
      })
      .exec();

    if (!urlData) {
      return new NullShortenedUrl();
    }

    return new ShortenedUrl(
      {
        originalUrl: urlData.originalUrl,
        key: urlData.key,
      }
    );
  }
}
