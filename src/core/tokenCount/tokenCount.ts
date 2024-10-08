import { type Tiktoken, get_encoding } from 'tiktoken';
import { logger } from '../../shared/logger.js';

export class TokenCounter {
  private encoding: Tiktoken;

  constructor() {
    // Setup encoding
    this.encoding = get_encoding('cl100k_base');
  }

  public countTokens(content: string, filePath?: string): number {
    try {
      return this.encoding.encode(content).length;
    } catch (error) {
      let message = '';
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }

      if (filePath) {
        logger.warn(`Failed to count tokens. path: ${filePath}, error: ${message}`);
      } else {
        logger.warn(`Failed to count tokens. error: ${message}`);
      }

      return 0;
    }
  }

  public free(): void {
    this.encoding.free();
  }
}
