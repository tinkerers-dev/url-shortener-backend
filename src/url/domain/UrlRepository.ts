import {type Url} from "./Url";
import {ShortenedUrl} from "./ShortenedUrl";

export interface UrlRepository {
  save(originalUrl: ShortenedUrl): Promise<Url>;

  findUrlByOriginalUrl(originalUrl: string): Promise<Url>;
}
