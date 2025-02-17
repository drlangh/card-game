import { CardClient } from '@/components';
import fs from 'fs';

const filePath = 'file.pdf';
let cachedFile = null;

async function getFileData(filePath, mimeType) {
  if (!cachedFile) {
    const data = await fs.promises.readFile(filePath);
    cachedFile = {
      inlineData: {
        data: Buffer.from(data).toString('base64'),
        mimeType,
      },
    };
  }
  return cachedFile;
}

export default async function Cards() {
  const file = await getFileData(filePath, 'application/pdf');

  return <CardClient file={file} />;
}
