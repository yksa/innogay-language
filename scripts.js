document.addEventListener("DOMContentLoaded", () => {
  new Converter();
});

class Converter {
  reservedKey1 = ["ခ", "ဂ", "ပ", "ဖ", "ဝ", "ဒ"];
  constructor() {
    this.input = document.getElementById("input");
    this.output = document.getElementById("output");
    this.input.addEventListener("input", () => {
      this.output.textContent = this.convert(this.input.value);
    });
  }

  convert(input) {
    const segmenter = new Intl.Segmenter("my", { granularity: "word" });
    const segments = [...segmenter.segment(input)].map(
      (segment) => segment.segment
    );

    const transformFirstCharacter = (word) => {
      const isKaGyi = word[0] === "က";
      const yayCha = this.getYayCha({ text: word[0], secondText: word[1] });
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

    const transformCompoundWord = (word) => {
      if (word === "ဝတ်ရည်") {
        const result1 = transformFirstCharacter("ဝတ်");
        const result2 = transformFirstCharacter("ရည်");
        return result1 + result2;
      } else {
        return transformFirstCharacter(word);
      }
    };

    const convertedArrays = segments.map((element) => {
      return transformCompoundWord(element);
    });

    const convertedText = convertedArrays.join();
    return convertedText;
  }

  isMyanmarUnicode = (text) => {
    const myanmarUnicodeRegex = /^[\u1000-\u109F]+$/; // Regex to match Myanmar Unicode characters
    return myanmarUnicodeRegex.test(text);
  };

  getYayCha = ({ text, secondText }) => {
    if (["ျ", "ြ"].includes(secondText)) {
      return "ာ";
    }
    return this.reservedKey1.includes(text) ? "ါ" : "ာ";
  };
}
