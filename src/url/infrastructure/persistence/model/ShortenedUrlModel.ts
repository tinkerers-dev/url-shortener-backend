import mongoose, {Schema} from "mongoose";
import {type ShortenedUrlStructure} from "../../../types";

const shortenedUrlSchema = new Schema<ShortenedUrlStructure>({
  key: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
});

export const ShortenedUrlModel = mongoose.model(
  "ShortenedUrl",
  shortenedUrlSchema,
  "shortenedUrls",
);
