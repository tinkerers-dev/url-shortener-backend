import {ShortenedUrl} from "./ShortenedUrl.js";

export class NullShortenedUrl extends ShortenedUrl {
  constructor() {
    super({key: null!, originalUrl: null!});
  }
}
