import * as Types from '../types/types.js';

/**
 * @param {Types.Field} obj1
 * @param {Types.Field} obj2
 * @returns {Types.ComparisonObj}
 */
export function compareFields(obj1, obj2) {
  /** @type {Types.ComparisonObj} */
  const res = {};

  const numOfKeysObj1 = Object.keys(obj1).length;
  const numOfKeysObj2 = Object.keys(obj2).length;

  if (numOfKeysObj1 === 0 && numOfKeysObj2 === 0) {
    return res;
  }

  if (numOfKeysObj1 === 0 && numOfKeysObj2 > 0) {
    res.key = obj2.key;
    res.type = obj2.type;
    if ('options' in obj2) {
      res.options = {
        inObj1: [],
        inObj2: obj2.options,
      };
    }
    return res;
  }

  if (numOfKeysObj1 > 0 && numOfKeysObj2 === 0) {
    res.key = obj1.key;
    res.type = obj1.type;
    if ('options' in obj1) {
      res.options = {
        inObj1: obj1.options,
        inObj2: [],
      };
    }
    return res;
  }

  const optionsIn1ButNot2 = 'options' in obj1 && !('options' in obj2);
  const optionsIn2ButNot1 = 'options' in obj2 && !('options' in obj1);
  const optionsInBoth = 'options' in obj1 && 'options' in obj2;

  if (optionsIn1ButNot2 || optionsIn2ButNot1) {
    res.key = obj1.key;
    res.type = obj1.type;
    res.options = {
      inObj1: obj1.options,
      inObj2: [],
    };
    return res;
  }

  if (obj1.key !== obj2.key) {
    res.type = obj1.type;
    res.key = obj1.key;
  }

  if (optionsInBoth) {
    if (obj1.options.length !== obj2.options.length) {
      res.key = obj1.key;
      res.type = obj1.type;
      res.options = {
        inObj1: arrayComplement(obj1.options, obj2.options),
        inObj2: arrayComplement(obj2.options, obj1.options),
      };
      return res;
    }

    if (!haveSameElements(obj1.options, obj2.options)) {
      res.key = obj1.key;
      res.type = obj1.type;
      res.options = {
        inObj1: arrayComplement(obj1.options, obj2.options),
        inObj2: arrayComplement(obj2.options, obj1.options),
      };
    }
  }

  return res;
}

/**
 * @param {string[]} arr1
 * @param {string[]} arr2
 * @returns {string[]}
 */
function arrayComplement(arr1, arr2) {
  /** @type {string[]} */
  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    const arr1El = arr1[i];
    if (!arr2.includes(arr1El)) {
      result.push(arr1El);
    }
  }

  return result;
}

/**
 * @param {string[]} arr1
 * @param {string[]} arr2
 * @returns {boolean}
 */
function haveSameElements(arr1, arr2) {
  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  return true;
}
