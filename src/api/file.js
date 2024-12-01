import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';

// Initialize GoogleGenerativeAI with your NEXT_PUBLIC_GEMINI_API_KEY.
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY
);
// Initialize GoogleAIFileManager with your NEXT_PUBLIC_GEMINI_API_KEY.
const fileManager = new GoogleAIFileManager(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY
);

export default async function uploadFile() {
  // Upload the file and specify a display name.
  const uploadResponse = await fileManager.uploadFile(
    './R41_Shift_2020_Practitioners_Framework_Engaging_Male-Oriented_Settings.pdf',
    {
      mimeType: 'application/pdf',
      displayName: 'CardGame PDF',
    }
  );

  // // View the response.
  // console.log(
  //   `Uploaded file ${uploadResponse.file.mimeType} as: ${uploadResponse.file.uri}`
  // );

  return uploadResponse.file.uri;
}
