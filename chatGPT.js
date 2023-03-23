const key = "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";
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: key,
});
const openai = new OpenAIApi(configuration);
async function runCompletion() {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "可以測試嗎?",
    max_tokens: 600,
    temperature: 0,
  });
  console.log(completion.data.choices[0].text);
}
runCompletion();
