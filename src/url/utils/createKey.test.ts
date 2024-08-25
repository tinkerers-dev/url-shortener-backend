import CRC32 from "crc-32";
import { createKey } from "./createKey.js";

describe("given a createKey function", () => {
  describe("When it receives the URL 'https://example.com'", () => {
    test("Then it should return the correct CRC32 hash as a string", () => {
      const url = "https://example.com";
      const expectedKey = String(CRC32.str(url));

      const result = createKey(url);

      expect(result).toBe(expectedKey);
    });
  });

  describe("When it receives the URL 'https://example-two.com'", () => {
    test("Then it should return the correct CRC32 hash as a string", () => {
      const url = "https://example-two.com";
      const expectedKey = String(CRC32.str(url));

      const result = createKey(url);

      expect(result).toBe(expectedKey);
    });
  });

  describe("When it receives an empty URL", () => {
    test("Then it should throw an error: invalid URL", () => {
      const url = "";
      const expectedError = new Error("invalid URL");

      expect(() => {
        createKey(url);
      }).toThrow(expectedError);
    });
  });
});
