import mongoose, { Schema } from "mongoose";
import { type ShortenedUrlStructure } from "../types";

const shortenedUrlSchema = new Schema<ShortenedUrlStructure>({
  shortUrl: {
    type: String,
    unique: true,
    required: true,
  },
  originalUrl: {
    type: String,
    unique: true,
    required: true,
  },
  key: {
    type: String,
    unique: true,
    required: true,
  },
});

export const ShortenedUrl = mongoose.model(
  "ShortenedUrl",
  shortenedUrlSchema,
  "shortenedUrls",
);
