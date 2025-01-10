// server.ts
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { decrypt, encrypt } from "./utils/converter.ts";
import { isMyanmarUnicode, splitMyanmarWords } from "./utils/myanmarUtils.ts";
import { combinePairs } from "./utils/myanmarUtils.ts";

// Create a new Oak application
const app = new Application();

// Create a new router
const router = new Router();

// Define a simple GET endpoint
router.get("/", (context) => {
  context.response.body = { message: "Hello from Deno API server!" };
});

// Define another GET endpoint
router.get("/encrypt", (context) => {
  const key = context.request.url.searchParams.get("key"); // Access query parameter
  // filter space from start and end
  const trimmedStr = key?.trim();

  if (trimmedStr && isMyanmarUnicode(trimmedStr)) {
    const segments = splitMyanmarWords(trimmedStr);

    const convertedArrays = segments.map((element) => encrypt(element));

    const convertedText = convertedArrays.join(" ");

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

router.get("/decrypt", (context) => {
  const key = context.request.url.searchParams.get("key"); // Access query parameter
  // filter space from start and end
  const trimmedStr = key?.trim();

  if (trimmedStr && isMyanmarUnicode(trimmedStr)) {
    const segments = splitMyanmarWords(trimmedStr);

    const modifiedSegments = combinePairs(segments);

    const convertedArrays = modifiedSegments.map((element) => decrypt(element));

    const convertedText = convertedArrays.join(" ");

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
