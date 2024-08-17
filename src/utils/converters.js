/**
 * @param {number} bytes
 * @returns {number}
 */
export function byteToMb(bytes) {
  return bytes / 1024 / 1024;
}

/**
 * @param {number} mb
 * @returns {number}
 */
export function mbToByte(mb) {
  return mb * 1024 * 1024;
}

/**
 * @param {number} number
 * @param {number} [decimals=2]
 * @returns {number}
 */
export function toDecimals(number, decimals = 2) {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
