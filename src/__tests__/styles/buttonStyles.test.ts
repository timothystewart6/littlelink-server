import { readFileSync } from 'fs';
import { join } from 'path';

const brandsCss = readFileSync(
  join(process.cwd(), 'public/css/brands.css'),
  'utf8',
);

function cssBlock(selector: RegExp): string {
  const match = brandsCss.match(selector);
  if (!match) {
    throw new Error('Expected CSS block was not found');
  }
  return match[1];
}

describe('button responsive styles', () => {
  test('buttons shrink inside narrow containers and center their content', () => {
    const buttonRules = cssBlock(/\.button,\s*button\s*\{([\s\S]*?)\n\}/);

    expect(buttonRules).toContain('display: flex;');
    expect(buttonRules).toContain('align-items: center;');
    expect(buttonRules).toContain('justify-content: center;');
    expect(buttonRules).toContain('width: min(300px, 100%);');
    expect(buttonRules).toContain('max-width: 100%;');
    expect(buttonRules).toContain('box-sizing: border-box;');
    expect(buttonRules).not.toContain('width: 300px;');
  });

  test('button icons keep stable dimensions in flexible buttons', () => {
    const iconRules = cssBlock(/\.icon\s*\{([\s\S]*?)\n\}/);

    expect(iconRules).toContain('flex-shrink: 0;');
    expect(iconRules).toContain('width: 20px;');
    expect(iconRules).toContain('height: 20px;');
  });
});
