import {Url} from "./Url";

type ShortenedUrlProps = {
  key: string,
  originalUrl: string,
};

export class ShortenedUrl extends Url {
  private readonly key: string;

  constructor(props: ShortenedUrlProps) {
    super(props.originalUrl);
    this.key = props.key;
  }
}
