import "dotenv/config";
import startServer from "./shared/infrastructure/http/server/index.js";
import connectToDataBase from "./shared/infrastructure/database/index.js";
import {configuration} from "./config/index.js";


await connectToDataBase(configuration.mongoDbUri);

startServer(configuration.port);
