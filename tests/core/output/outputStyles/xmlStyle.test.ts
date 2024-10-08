import process from 'node:process';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { buildOutputGeneratorContext } from '../../../../src/core/output/outputGenerate.js';
import { generateXmlStyle } from '../../../../src/core/output/outputStyles/xmlStyle.js';
import { createMockConfig } from '../../../testing/testUtils.js';

vi.mock('fs/promises');

describe('xmlStyle', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('generateXmlOutput should include user-provided header text', async () => {
    const mockConfig = createMockConfig({
      output: {
        filePath: 'output.txt',
        style: 'xml',
        headerText: 'Custom header text',
        topFilesLength: 2,
        showLineNumbers: false,
        removeComments: false,
        removeEmptyLines: false,
      },
    });

    const context = await buildOutputGeneratorContext(process.cwd(), mockConfig, [], []);
    const output = await generateXmlStyle(context);

    expect(output).toContain('file_summary');
    expect(output).toContain('repository_structure');
    expect(output).toContain('Custom header text');
    expect(output).toContain('repository_files');
  });
});
