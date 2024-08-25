import {type KeyGenerator} from "../../domain/KeyGenerator";
import CRC32 from "crc-32";

export class Crc32KeyGenerator implements KeyGenerator {
  generateKeyFromHashOf(text: string): string {
    return String(CRC32.str(text));
  }
}
