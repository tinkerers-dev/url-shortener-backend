import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.use(cors());

export default app;
