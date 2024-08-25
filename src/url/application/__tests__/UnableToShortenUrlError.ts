import {DomainError} from "./DomainError";

export class UnableToShortenUrlError extends DomainError {
  constructor(public readonly cause: Error) {
    super("Unable to shorten the url");
  }
}
