/**
 * A utility function to conditionally concatenate two strings used for css
 * @param {boolean} val - A boolean value
 * @param {string} a - The first string
 * @param {string} b - The second string
 * @returns {string} The left hand if true else the right hand is return
 */
export function cn(val: boolean, a = '', b = '') {
  return val ? a : b;
}
