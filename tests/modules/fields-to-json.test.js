import { createReadStream } from 'node:fs';
import { test, describe, expect } from '@jest/globals';
import {
  parseFieldsToJsonArray,
  parseFieldsToMap,
} from '../../src/modules/fields-to-json.js';

describe('parsing fields to json', () => {
  test('successfully parses dumped data file to array', async () => {
    const stream = createReadStream('tests/mocks/dumped_data.txt');
    const jsonArray = await parseFieldsToJsonArray(stream);

    expect(jsonArray.length).toBe(3);
    const field = jsonArray[0];

    expect(field.type).toBe('Button');
    expect(field.key).toBe('select_thing');
    expect(field.options.length).toBe(2);
    expect(field.options).toContain('No');
    expect(field.options).toContain('Yes');
  });

  test('successfully parses dumped data to map', async () => {
    const stream = createReadStream('tests/mocks/dumped_data.txt');
    const map = await parseFieldsToMap(stream);

    expect(Object.keys(map).length).toBe(3);
    const field = map['select_thing'];

    expect(field.type).toBe('Button');
    expect(field.key).toBe('select_thing');
    expect(field.options.length).toBe(2);
    expect(field.options).toContain('No');
    expect(field.options).toContain('Yes');
  });

  test('returns empty array when dumped data has no form', async () => {
    const stream = createReadStream('tests/mocks/dumped_data_no_forms.txt');
    const jsonArray = await parseFieldsToJsonArray(stream);

    expect(jsonArray.length).toBe(0);
  });

  test('returns an empty map when dumped data has no form', async () => {
    const stream = createReadStream('tests/mocks/dumped_data_no_forms.txt');
    const map = await parseFieldsToMap(stream);

    expect(Object.keys(map).length).toBe(0);
  });
});
