import { ReadStream } from 'node:fs';
import readline from 'readline';
import {
  LINE_BREAK_DELIMITER,
  VALUE_LINE_DELIMITER,
  SKIPPED_VALUES,
  FIELD_NAME,
  FIELD_STATE_OPTION,
  FIELD_TYPE,
} from '../constants/pdftk.js';
import * as Types from '../types/types.js';

/**
 * @param {ReadStream} stream
 * @returns {Promise<Types.Field[]>}
 */
export async function parseFieldsToJsonArray(stream) {
  /** @type {Types.Field} */
  let currObj = {};
  /** @type {Types.Field[]} */
  const objs = [];

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (LINE_BREAK_DELIMITER === line) {
      if (Object.keys(currObj).length > 0) {
        objs.push(currObj);
      }
      currObj = {};
      continue;
    }
    readLine(line, currObj);
  }

  // We reached the end of file, push the last obj if it exists
  if (Object.keys(currObj).length > 0) {
    objs.push(currObj);
  }

  return objs;
}

/**
 * @param {ReadStream} stream
 * @returns {Promise<Record<string, Types.Field>>}
 */
export async function parseFieldsToMap(stream) {
  /** @type {Types.Field} */
  let currObj = {};
  /** @type {Map<string, Types.Field>} */
  const map = {};

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (LINE_BREAK_DELIMITER === line) {
      if (Object.keys(currObj).length > 0) {
        map[currObj.key] = currObj;
      }
      currObj = {};
      continue;
    }
    readLine(line, currObj);
  }

  // We reached the end of file, push the last obj if it exists
  if (Object.keys(currObj).length > 0) {
    map[currObj.key] = currObj;
  }

  return map;
}

/**
 * Parser one line at a time, searching for matches
 *
 * @param {string} line
 * @returns {void}
 */
function readLine(line, currObj) {
  if (line.includes(FIELD_TYPE)) {
    const type = getLineValue(line);
    currObj.type = type;
    return;
  }
  if (line.includes(FIELD_NAME)) {
    const key = getLineValue(line);
    currObj.key = key;
    return;
  }
  if (line.includes(FIELD_STATE_OPTION)) {
    const option = getLineValue(line);
    if (SKIPPED_VALUES.includes(option.toLowerCase())) {
      return;
    }
    if (!('options' in currObj)) {
      currObj.options = [];
    }
    currObj.options.push(option);
  }
}

/**
 * @param {string} line
 * @returns {string} - The value parsed
 */
function getLineValue(line) {
  return line.split(VALUE_LINE_DELIMITER)[1];
}
