import {ShortenedUrl} from "./ShortenedUrl";

export interface UrlShortener {
  shortenUrl(originalUrl: string): Promise<ShortenedUrl>;
}
