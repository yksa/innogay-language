import { getYayCha, splitMyanmarWords } from "./myanmarUtils.ts";

export const encrypt = (word: string) => {
  const text = word[0],
    secondText = word[1],
    o = `ေ${getYayCha({ text, secondText })}်${"က" === text ? "သ" : "က"}`;
  return "ျ" === secondText || "ြ" === secondText || "ှ" === secondText
    ? `${text}${secondText}${o}${word.slice(2)}`
    : `${text}${o}${word.slice(1)}`;
};

export const decrypt = (word: string) => {
  let [t, n] = splitMyanmarWords(word);
  return (t = t.replace(/[ေ်ါာ]/g, "")), (n = n.replace(/[ကသ]/g, "")), t + n;
};
