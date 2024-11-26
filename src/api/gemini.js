const { GoogleGenerativeAI } = require('@google/generative-ai');
const promptConfig = require('@/json/prompt.json'); // Renamed to avoid shadowing

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL,
});
const maxTries = 3;

export async function getCard(age, category) {
  const prompt1 = promptConfig.prompt1;
  let cardData;

  for (let tries = 0; tries < maxTries; tries++) {
    try {
      const completion = await model.generateContent(prompt1);
      const assistantReply = completion.response.text().trim();

      const validJsonString = assistantReply
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']')
        .replace(/{age}/g, age)
        .replace(/{category}/g, category.name);

      cardData = JSON.parse(validJsonString);
      return cardData;
    } catch (error) {
      if (error instanceof SyntaxError) {
        // JSON parsing error
        console.error('Error parsing assistant reply:', error);
      } else {
        // Error generating content
        console.error('Error generating card:', error);
      }

      // If this was the last attempt, return default cardData
      if (tries === maxTries - 1) {
        if (error instanceof SyntaxError) {
          cardData = {
            content:
              'Everyone deserves to feel safe and respected. Learn how you can help.',
            link: 'https://www.thehotline.org/',
          };
        } else {
          cardData = {
            content:
              'An error occurred while generating the card. Please try again.',
            link: '#',
          };
        }
        return cardData;
      }

      await new Promise((res) => setTimeout(res, 1000));
    }
  }
}
