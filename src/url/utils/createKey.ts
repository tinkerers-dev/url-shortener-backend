import CRC32 from "crc-32";

export const createKey = (url: string): string => {
  if (!url) {
    throw new Error("invalid URL");
  }

  return String(CRC32.str(url));
};
