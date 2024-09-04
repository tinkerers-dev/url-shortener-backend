import {type ShortenedUrl} from "./ShortenedUrl";

export interface UrlShortener {
  shortenUrl(originalUrl: string): Promise<ShortenedUrl>;
  findUrlByKey(key: string): Promise<ShortenedUrl>;
}
