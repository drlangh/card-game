const { GoogleGenerativeAI } = require('@google/generative-ai');
const promptConfig = require('@/json/prompt.json'); // Renamed to avoid shadowing

const MAX_TRIES = 3;
const MIME_TYPE = 'application/pdf';

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY
);
// models available: 'gemini-1.5-pro', 'gemini-1.5-flash-8b', 'gemini-1.5-flash', 'aqa'
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash-8b',
});

export async function getCard(age, category) {
  let cardData;
  const prompt1 = promptConfig.prompt1
    .replace(/{age}/g, age)
    .replace(/{category}/g, category.name);

  for (let tries = 0; tries < MAX_TRIES; tries++) {
    try {
      const completion = await model.generateContent(prompt1);
      const assistantReply = completion.response.text().trim();

      const validJsonString = assistantReply
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']');

      const result =
        validJsonString.slice(0, -1) + ', "status": 200 }';

      cardData = JSON.parse(result);
      return cardData;
    } catch (error) {
      console.error('Error generating card:', error);

      if (tries === MAX_TRIES - 1) {
        cardData = {
          content:
            error instanceof SyntaxError
              ? 'Everyone deserves to feel safe and respected. Learn how you can help.'
              : 'An error occurred while generating the card. Please try again.',
          link:
            error instanceof SyntaxError
              ? 'https://www.thehotline.org/'
              : '#',
          status: 500,
        };
        return cardData;
      }

      await new Promise((res) => setTimeout(res, 1000));
    }
  }
}

export async function getMoreInformation(
  content,
  age,
  category,
  fileUri
) {
  let moreInformation;
  const prompt2 = promptConfig.prompt2
    .replace(/{age}/g, age)
    .replace(/{category}/g, category.name)
    .replace(/{content}/g, content);

  for (let tries = 0; tries < MAX_TRIES; tries++) {
    try {
      const completion = await model.generateContent([
        {
          fileData: {
            mimeType: MIME_TYPE,
            fileUri: fileUri,
          },
        },
        {
          text: prompt2,
        },
      ]);
      moreInformation = completion.response.text().trim();

      return moreInformation;
    } catch (error) {
      console.error('Error generating more information:', error);

      if (tries === MAX_TRIES - 1) {
        moreInformation =
          error instanceof SyntaxError
            ? 'Know more about this topic by visiting the link below.'
            : 'An error occurred while generating more information. Please try again.';

        return moreInformation;
      }

      await new Promise((res) => setTimeout(res, 1000));
    }
  }
}
