const { createWorker } = require("tesseract.js");
const translate = require("translate-google");
const prompt = require("prompt-sync")();

const worker = createWorker();

(async () => {
  await worker.load();
  await worker.loadLanguage("ara");
  await worker.initialize("ara");
  const {
    data: { text },
  } = await worker.recognize(
    prompt("Enter the link of a tweet image (not the tweet itself): ")
  );
  console.log(text);
  await worker.terminate();

  translate(text, { from: "ar", to: "en" })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
})();
