import {Url} from "./Url";

export interface UrlRepository {
  shortenUrl(originalUrl: string): Promise<Url>;

  findUrlByOriginalUrl(originalUrl: string): Promise<Url | undefined>;
}
