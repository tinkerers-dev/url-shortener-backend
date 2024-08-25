import {ShortenedUrl} from "./ShortenedUrl";

export class NullShortenedUrl extends ShortenedUrl {
  constructor() {
    super({key: null!, originalUrl: null!});
  }
}
