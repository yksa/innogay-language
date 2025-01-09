export const isMyanmarUnicode = (text: string): boolean => {
  const myanmarUnicodeRegex = /^[\u1000-\u109F]+$/; // Regex to match Myanmar Unicode characters
  return myanmarUnicodeRegex.test(text);
};
