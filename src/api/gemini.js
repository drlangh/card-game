const { GoogleGenerativeAI } = require('@google/generative-ai');
const promptConfig = require('@/json/prompt.json'); // Renamed to avoid shadowing

const maxTries = 3;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// models available: 'gemini-1.5-pro', 'gemini-1.5-flash-8b', 'gemini-1.5-flash', 'aqa'
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash-8b',
});

export async function getCard(age, category) {
  let cardData;
  const prompt1 = promptConfig.prompt1
    .replace(/{age}/g, age)
    .replace(/{category}/g, category.name);

  for (let tries = 0; tries < maxTries; tries++) {
    try {
      const completion = await model.generateContent(prompt1);
      const assistantReply = completion.response.text().trim();

      const validJsonString = assistantReply
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']');

      cardData = JSON.parse(validJsonString);
      return cardData;
    } catch (error) {
      console.error('Error generating card:', error);

      if (tries === maxTries - 1) {
        cardData = {
          content:
            error instanceof SyntaxError
              ? 'Everyone deserves to feel safe and respected. Learn how you can help.'
              : 'An error occurred while generating the card. Please try again.',
          link:
            error instanceof SyntaxError
              ? 'https://www.thehotline.org/'
              : '#',
        };
        return cardData;
      }

      await new Promise((res) => setTimeout(res, 1000));
    }
  }
}

export async function getMoreInformation(content, age, category) {
  let moreInformation;
  const prompt2 = promptConfig.prompt2
    .replace(/{age}/g, age)
    .replace(/{category}/g, category.name)
    .replace(/{content}/g, content);

  for (let tries = 0; tries < maxTries; tries++) {
    try {
      const completion = await model.generateContent(prompt2);
      moreInformation = completion.response.text().trim();
      console.log(prompt2);

      return moreInformation;
    } catch (error) {
      console.error('Error generating more information:', error);

      if (tries === maxTries - 1) {
        moreInformation =
          error instanceof SyntaxError
            ? 'Everyone deserves to feel safe and respected. Learn how you can help.'
            : 'An error occurred while generating more information. Please try again.';

        return moreInformation;
      }

      await new Promise((res) => setTimeout(res, 1000));
    }
  }
}
