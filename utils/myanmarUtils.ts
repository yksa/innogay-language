export const reservedKey1 = ["ခ", "ဂ", "ပ", "ဖ", "ဝ", "ဒ"];

export const isMyanmarUnicode = (text: string): boolean => {
  const myanmarUnicodeRegex = /^[\u1000-\u109F]+$/;
  return myanmarUnicodeRegex.test(text);
};

export const getYayCha = ({
  text,
  secondText,
}: {
  text: string;
  secondText: string;
}) => {
  if (["ျ", "ြ"].includes(secondText)) {
    return "ာ";
  }
  return reservedKey1.includes(text) ? "ါ" : "ာ";
};

const segmenter = new Intl.Segmenter("my", { granularity: "word" });
export const getMyanmarWords = (str: string) => {
  const segments = [...segmenter.segment(str)].map(
    (segment) => segment.segment
  );

  return segments;
};
