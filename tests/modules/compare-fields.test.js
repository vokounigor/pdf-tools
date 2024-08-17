import { test, describe, expect } from '@jest/globals';
import * as Types from '../../src/types/types.js';
import { compareFields } from '../../src/modules/compare-fields.js';

describe('comparing json objects', () => {
  test('returns an empty object when jsons are the same', () => {
    /** @type {Types.Field} */
    const obj1 = {
      type: 'Text',
      key: 'user_surname',
    };

    /** @type {Types.Field} */
    const obj2 = {
      type: 'Text',
      key: 'user_surname',
    };

    const comparison = compareFields(obj1, obj2);
    expect(Object.keys(comparison).length).toBe(0);
  });

  test('return an empty object when jsons have options scrambled and are same', () => {
    /** @type {Types.Field} */
    const obj1 = {
      type: 'Button',
      key: 'is_new',
      options: ['Yes', 'No'],
    };

    /** @type {Types.Field} */
    const obj2 = {
      type: 'Button',
      key: 'is_new',
      options: ['No', 'Yes'],
    };

    const comparison = compareFields(obj1, obj2);
    expect(Object.keys(comparison).length).toBe(0);
  });

  test('returns a json object if there are differences', () => {
    /** @type {Types.Field} */
    const obj1 = {
      type: 'Text',
      key: 'is_new4',
    };

    /** @type {Types.Field} */
    const obj2 = {
      type: 'Text',
      key: 'is_new',
    };

    const comparison = compareFields(obj1, obj2);
    expect(Object.keys(comparison).length).toBe(2);
    expect(comparison.key).toBe('is_new4');
  });

  test('returns a json object if options are different', () => {
    /** @type {Types.Field} */
    const obj1 = {
      type: 'Button',
      key: 'is_new',
      options: ['Yes', 'Maybe'],
    };

    /** @type {Types.Field} */
    const obj2 = {
      type: 'Button',
      key: 'is_new',
      options: ['No', 'Yes'],
    };

    const comparison = compareFields(obj1, obj2);
    expect(Object.keys(comparison).length).toBe(3);
    expect(comparison.key).toBe('is_new');
    expect(comparison.options).toEqual({
      inObj1: ['Maybe'],
      inObj2: ['No'],
    });
  });

  test('returns obj1 if nothing is in obj2', () => {
    /** @type {Types.Field} */
    const obj1 = {
      type: 'Text',
      key: 'text_key',
    };

    const obj2 = {};

    const comparison = compareFields(obj1, obj2);
    expect(Object.keys(comparison).length).toBe(2);
    expect(comparison.key).toBe('text_key');
    expect(comparison).not.toHaveProperty('options');
  });

  test('returns an empty obj if both objects are empty', () => {
    const obj1 = {};
    const obj2 = {};

    const comparison = compareFields(obj1, obj2);
    expect(Object.keys(comparison).length).toBe(0);
  });
});
