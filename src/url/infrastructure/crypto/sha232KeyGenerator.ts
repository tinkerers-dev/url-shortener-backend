import * as crypto from "crypto";

export class Sha256KeyGenerator {
  generateKeyFromHashOf(text: string): string {
    const hash = crypto.createHash("sha256").update(text).digest("base64");

    return hash.replace(/[^a-zA-Z0-9]/g, "").substring(0, 6);
  }
}
