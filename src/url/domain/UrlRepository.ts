import {type ShortenedUrl} from "./ShortenedUrl";

export interface UrlRepository {
  save(shortenedUrl: ShortenedUrl): Promise<void>;

  findUrlByKey(key: string): Promise<ShortenedUrl>;
}
