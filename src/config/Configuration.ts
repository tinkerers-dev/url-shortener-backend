type ConfigurationParams = { mongoDbUri: string; deployUrl: string; port: number };

export class Configuration {
  public readonly deployUrl: string;
  public readonly mongoDbUri: string;
  public readonly port: number;

  constructor({
                deployUrl,
                port,
                mongoDbUri
              }: ConfigurationParams) {
    this.deployUrl = deployUrl;
    this.port = port;
    this.mongoDbUri = mongoDbUri;
  }
}
