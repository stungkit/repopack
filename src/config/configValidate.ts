import { RepopackError } from '../shared/errorHandle.js';
import type { RepopackConfigFile } from './configTypes.js';

export class RepopackConfigValidationError extends RepopackError {
  constructor(message: string) {
    super(message);
    this.name = 'RepopackConfigValidationError';
  }
}

export function validateConfig(config: unknown): asserts config is RepopackConfigFile {
  if (typeof config !== 'object' || config == null) {
    throw new RepopackConfigValidationError('Configuration must be an object');
  }

  const { output, ignore, security } = config as Partial<RepopackConfigFile>;

  // Validate output
  if (output !== undefined) {
    if (typeof output !== 'object' || output == null) {
      throw new RepopackConfigValidationError('output must be an object');
    }

    const { filePath, headerText, style } = output;
    if (filePath !== undefined && typeof filePath !== 'string') {
      throw new RepopackConfigValidationError('output.filePath must be a string');
    }
    if (headerText !== undefined && typeof headerText !== 'string') {
      throw new RepopackConfigValidationError('output.headerText must be a string');
    }
    if (style !== undefined) {
      if (typeof style !== 'string') {
        throw new RepopackConfigValidationError('output.style must be a string');
      }
      if (style !== 'plain' && style !== 'xml') {
        throw new RepopackConfigValidationError('output.style must be either "plain" or "xml"');
      }
    }
  }

  // Validate ignore
  if (ignore !== undefined) {
    if (typeof ignore !== 'object' || ignore == null) {
      throw new RepopackConfigValidationError('ignore must be an object');
    }

    const { useDefaultPatterns, customPatterns } = ignore;
    if (useDefaultPatterns !== undefined && typeof useDefaultPatterns !== 'boolean') {
      throw new RepopackConfigValidationError('ignore.useDefaultPatterns must be a boolean');
    }
    if (customPatterns !== undefined) {
      if (!Array.isArray(customPatterns)) {
        throw new RepopackConfigValidationError('ignore.customPatterns must be an array');
      }
      if (!customPatterns.every((pattern) => typeof pattern === 'string')) {
        throw new RepopackConfigValidationError('All items in ignore.customPatterns must be strings');
      }
    }
  }

  // Validate security
  if (security !== undefined) {
    if (typeof security !== 'object' || security == null) {
      throw new RepopackConfigValidationError('security must be an object');
    }

    const { enableSecurityCheck } = security;
    if (enableSecurityCheck !== undefined && typeof enableSecurityCheck !== 'boolean') {
      throw new RepopackConfigValidationError('security.enableSecurityCheck must be a boolean');
    }
  }
}
