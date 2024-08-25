export interface KeyGenerator {
  generateKeyFromHashOf(text: string): string;
}
