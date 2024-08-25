import CRC32 from "crc-32";

export const createKey = (url: string): string => String(CRC32.str(url));
