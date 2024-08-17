import { compareFields } from './compare-fields.js';
import * as Types from '../types/types.js';

/**
 * @param {Record<string, Types.Field>} file1Map
 * @param {Record<string, Types.Field>} file2Map
 * @returns {Types.ComparisonObj[]}
 */
export function fileComplement(file1Map, file2Map) {
  /** @type {Types.ComparisonObj} */
  const diff = [];
  const file1Entries = Object.keys(file1Map);
  for (let i = 0; i < file1Entries.length; i++) {
    const fileKey = file1Entries[i];
    if (!(fileKey in file2Map)) {
      diff.push(file1Map[fileKey]);
      continue;
    }
    const currObj = compareFields(file1Map[fileKey], file2Map[fileKey]);
    if (Object.keys(currObj).length > 0) {
      diff.push(currObj);
    }
  }

  return diff;
}
