'use server';
import { GoogleAIFileManager } from '@google/generative-ai/server';

// Initialize GoogleAIFileManager with your NEXT_PUBLIC_GEMINI_API_KEY.
const fileManager = new GoogleAIFileManager(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY
);

export default async function uploadFile(timeOfUpload) {
  // Upload the file and specify a display name.
  const uploadResponse = await fileManager.uploadFile(
    './R41_Shift_2020_Practitioners_Framework_Engaging_Male-Oriented_Settings.pdf',
    {
      mimeType: 'application/pdf',
      displayName: 'CardGame PDF ' + timeOfUpload,
    }
  );

  // // View the response.
  // console.log(
  //   `Uploaded file ${uploadResponse.file.mimeType} as: ${uploadResponse.file.uri}`
  // );

  return uploadResponse.file.uri;
}
