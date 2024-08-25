import {NullUrl} from "./NullUrl";

export abstract class Url {
  protected constructor(protected originalUrl: string) {
  }
  
  isNull(): this is NullUrl {
    return this.originalUrl === null;
  }

}

