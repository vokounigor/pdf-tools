import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(join(__filename, '../'));

export function getViewsDirectory() {
  return join(__dirname, 'views');
}

export function getStaticDirectory() {
  return join(__dirname, 'public');
}
