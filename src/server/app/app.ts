import express from "express";
import cors from "cors";
import morgan from "morgan";
import notFoundError from "../middlewares/notFoundError.js";
import { generalError } from "../middlewares/generalError.js";

const app = express();
app.disable("x-powered-by");

app.post("/shorten-url");

app.use(morgan("dev"));
app.use(express.json());

app.use(cors());

app.use(notFoundError);
app.use(generalError);

export default app;
