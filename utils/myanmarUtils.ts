import { consonants, reservedKeys } from "./constants.ts";

export const cleanString = (str: string) => {
  return str.trim().replace(/\s+/g, "");
};
export const isMyanmarUnicode = (text: string): boolean => {
  const myanmarUnicodeRegex = /^[\u1000-\u109F]+$/;
  return myanmarUnicodeRegex.test(cleanString(text));
};

const segmenter = new Intl.Segmenter("my", { granularity: "word" });
export const getMyanmarWords = (str: string) => {
  const segments = [...segmenter.segment(str)].map(
    (segment) => segment.segment
  );

  return segments;
};

export const getYayCha = ({
  text,
  secondText,
}: {
  text: string;
  secondText: string;
}) => {
  return ["ျ", "ြ"].includes(secondText)
    ? "ာ"
    : reservedKeys.includes(text)
    ? "ါ"
    : "ာ";
};

export const splitMyanmarWords = (word: string) => {
  const wordParts = []; // stores the segments or parts of the word
  let currentSegment = ""; // temporary variable to build each segment

  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    if (consonants.includes(char)) {
      // when we encounter a consonant, push the previous segment (if any) and start a new segment
      if (currentSegment) wordParts.push(currentSegment);
      currentSegment = char;
    } else {
      // append the non-consonant to the current segment
      currentSegment += char;
    }
  }

  // Push the last segment if it exists
  if (currentSegment) wordParts.push(currentSegment);

  const finalSegments = []; // final array to hold combined segments

  for (let i = 0; i < wordParts.length; i++) {
    // if this part contains a "်" and doesn't contain "ေ", combine with the previous one
    if (i > 0 && wordParts[i].includes("်") && !wordParts[i].includes("ေ")) {
      finalSegments[finalSegments.length - 1] += wordParts[i];
    } else {
      finalSegments.push(wordParts[i]);
    }
  }

  return finalSegments;
};

export const combinePairs = (word: string[]) => {
  const t = [];
  for (let n = 0; n < word.length; n += 2)
    t.push(word[n] + (word[n + 1] || ""));
  return t;
};

// const segments = getMyanmarWords(trimmedStr);

// export const getMyanmarWords = (str: string) => {
//   const segments = [...segmenter.segment(str)].map(
//     (segment) => segment.segment
//   );

// const convertedArrays = segments.map((element) => {
//   return transformCompoundWord(element);
// });
