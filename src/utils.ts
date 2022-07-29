/**
 * Converts the first alphabetic character of a word to uppercase and the rest to lowercase.
 * @param word The word to capitalize
 * @returns Word capitalized
 */
export const toCapitalize = (word: string): string =>
  word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);
