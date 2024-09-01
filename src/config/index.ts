import {Configuration} from "./Configuration.js";

export const configuration = new Configuration({
  port: Number(process.env.PORT ?? 3000),
  mongoDbUri: process.env.MONGODB_URI!,
  deployUrl: process.env.DEPLOY_URL!,
});
