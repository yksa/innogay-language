import { getYayCha } from "./myanmarUtils.ts";

export const transformFirstCharacter = (word: string) => {
  const isKaGyi = word[0] === "က";
  const yayCha = getYayCha({ text: word[0], secondText: word[1] });
  const middleKey = `ေ${yayCha}်${isKaGyi ? "သ" : "က"}`;

  if (isKaGyi) {
    if (["ျ", "ြ", "ှ"].includes(word[1])) {
      return `${word[0]}${word[1]}${middleKey}${word.slice(2)}`;
    }
    return `${word[0]}${middleKey}${word.slice(1)}`;
  }

  if (["ျ", "ြ", "ှ"].includes(word[1])) {
    return `${word[0]}${word[1]}${middleKey}${word.slice(2)}`;
  }

  return `${word[0]}${middleKey}${word.slice(1)}`;
};

export const transformCompoundWord = (word: string) => {
  if (word === "ဝတ်ရည်") {
    const result1 = transformFirstCharacter("ဝတ်");
    const result2 = transformFirstCharacter("ရည်");
    return result1 + result2;
  } else {
    return transformFirstCharacter(word);
  }
};
