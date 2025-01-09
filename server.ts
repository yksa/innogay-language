// server.ts
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

// Create a new Oak application
const app = new Application();

// Create a new router
const router = new Router();

// Define a simple GET endpoint
router.get("/", (context) => {
  context.response.body = { message: "Hello from Deno API server!" };
});

const reservedKey1 = ["ခ", "ဂ", "ပ", "ဖ", "ဝ", "ဒ"];

const isMyanmarUnicode = (text: string): boolean => {
  const myanmarUnicodeRegex = /^[\u1000-\u109F]+$/; // Regex to match Myanmar Unicode characters
  return myanmarUnicodeRegex.test(text);
};

const getYayCha = ({
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

// Define another GET endpoint
router.get("/convert-to-gay", (context) => {
  const key = context.request.url.searchParams.get("key"); // Access query parameter

  if (key && isMyanmarUnicode(key)) {
    const segmenter = new Intl.Segmenter("my", { granularity: "word" });
    const segments = [...segmenter.segment(key)].map(
      (segment) => segment.segment
    );

    const transformFirstCharacter = (word: string) => {
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

    const transformCompoundWord = (word: string) => {
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

    context.response.body = {
      message: "ggwp",
      originalText: key,
      convertedText,
    };
  } else {
    context.response.body = {
      message: "Not Myanmar unicode",
      originalText: key,
      convertedText: key,
    };
  }
});

// Mount the router and start the app
app.use(router.routes());
app.use(router.allowedMethods());

// Define the port
const PORT = 8000;
console.log(`Server running on http://localhost:${PORT}`);

// Listen to the server
await app.listen({ port: PORT });

// command to start server
// deno run --allow-net --watch server.ts
