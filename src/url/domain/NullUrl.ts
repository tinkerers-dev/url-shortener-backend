import {Url} from "./Url";

export class NullUrl extends Url {
  constructor() {
    super("", "");
  }
}
