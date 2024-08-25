import {type ShortenedUrl} from "./ShortenedUrl";

export interface UrlRepository {
  save(originalUrl: ShortenedUrl): Promise<void>;

  findUrlByOriginalUrl(originalUrl: string): Promise<ShortenedUrl>;
}
