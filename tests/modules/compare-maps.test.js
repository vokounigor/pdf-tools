import { test, describe, expect } from '@jest/globals';
import { fileComplement } from '../../src/modules/compare-maps.js';
import * as Types from '../../src/types/types.js';

describe('comparing maps', () => {
  test('returns an empty array if maps are the same', () => {
    /** @type {Record<string, Types.Field>} */
    const obj1 = {
      test: {
        type: 'Text',
        key: 'main',
      },
    };
    /** @type {Record<string, Types.Field>} */
    const obj2 = {
      test: {
        type: 'Text',
        key: 'main',
      },
    };

    const diff = fileComplement(obj1, obj2);
    expect(diff.length).toBe(0);
  });

  test('returns keys from obj1 if missing in obj2', () => {
    /** @type {Record<string, Types.Field>} */
    const obj1 = {
      test: {
        type: 'Text',
        key: 'main',
      },
    };
    /** @type {Record<string, Types.Field>} */
    const obj2 = {
      test2: {
        type: 'Text',
        key: 'main2',
      },
    };

    const diff = fileComplement(obj1, obj2);
    expect(diff.length).toBe(1);
    expect(diff[0]).toEqual(obj1.test);
  });

  test('returns no keys if obj1 is missing them from obj2', () => {
    /** @type {Record<string, Types.Field>} */
    const obj1 = {};
    /** @type {Record<string, Types.Field>} */
    const obj2 = {
      test2: {
        type: 'Text',
        key: 'main2',
      },
    };

    const diff = fileComplement(obj1, obj2);
    expect(diff.length).toBe(0);
  });
});
